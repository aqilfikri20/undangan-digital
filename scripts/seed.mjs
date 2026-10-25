import mysql from 'mysql2/promise';
import { randomBytes, scrypt as scryptCallback } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('DATABASE_URL belum tersedia. Periksa file .env.');
const parsed = new URL(databaseUrl);
const database = decodeURIComponent(parsed.pathname.replace(/^\//, ''));
if (!/^[a-zA-Z0-9_]+$/.test(database)) throw new Error('Nama database hanya boleh berisi huruf, angka, dan garis bawah.');
const adminName = process.env.SEED_ADMIN_NAME || 'Admin UndangYuk';
const adminEmail = (process.env.SEED_ADMIN_EMAIL || 'admin@undangyuk.local').toLowerCase();
const adminPassword = process.env.SEED_ADMIN_PASSWORD;
if (!adminPassword || adminPassword.length < 12) throw new Error('Atur SEED_ADMIN_PASSWORD dengan kata sandi minimal 12 karakter di .env.');

const connection = await mysql.createConnection({ host: parsed.hostname, port: Number(parsed.port || 3306), user: decodeURIComponent(parsed.username), password: decodeURIComponent(parsed.password), multipleStatements: true, charset: 'utf8mb4' });
try {
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await connection.query(`USE \`${database}\``);
  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(190) NOT NULL UNIQUE,
      password_hash VARCHAR(180) NOT NULL,
      role ENUM('admin','user') NOT NULL DEFAULT 'user',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    CREATE TABLE IF NOT EXISTS invitations (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id BIGINT UNSIGNED NOT NULL UNIQUE,
      slug VARCHAR(190) NOT NULL UNIQUE,
      theme VARCHAR(60) NOT NULL DEFAULT '',
      completed BOOLEAN NOT NULL DEFAULT FALSE,
      wedding_data LONGTEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT invitations_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT invitations_json_check CHECK (JSON_VALID(wedding_data))
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    CREATE TABLE IF NOT EXISTS guest_messages (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      invitation_id BIGINT UNSIGNED NOT NULL,
      guest_name VARCHAR(120) NOT NULL,
      attendance VARCHAR(40) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      KEY guest_messages_invitation_created (invitation_id, created_at),
      CONSTRAINT guest_messages_invitation_fk FOREIGN KEY (invitation_id) REFERENCES invitations(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  const salt = randomBytes(16).toString('hex');
  const passwordHash = `${salt}:${(await scrypt(adminPassword, salt, 64)).toString('hex')}`;
  await connection.execute(`INSERT INTO users (name,email,password_hash,role) VALUES (?,?,?,'admin') ON DUPLICATE KEY UPDATE name=VALUES(name), password_hash=VALUES(password_hash), role='admin'`, [adminName, adminEmail, passwordHash]);
  const [[admin]] = await connection.execute('SELECT id FROM users WHERE email=?', [adminEmail]);
  const wedding = {
    bride: 'Amara Putri', groom: 'Bima Pratama', brideFather: 'Hendra Putri', brideMother: 'Sari Wulandari', groomFather: 'Darma Pratama', groomMother: 'Ratna Kusuma',
    akadDate: '2026-12-12', akadTime: '08:00', akadPlace: 'Masjid Agung Bandung', akadAddress: 'Jl. Asia Afrika, Bandung',
    receptionDate: '2026-12-12', receptionTime: '11:00', receptionPlace: 'Gedung Puspa Asri', receptionAddress: 'Jl. Lembong No. 10, Bandung',
    story: 'Dari pertemuan sederhana, tumbuh cerita yang ingin kami rayakan bersama.', storyMeet: 'Kami bertemu melalui teman-teman di sebuah acara kecil di Bandung.', storyMeetYear: '2021',
    storyRelationship: 'Percakapan ringan tumbuh menjadi perjalanan penuh dukungan dan tawa.', storyRelationshipYear: '2022', storyMarriage: 'Dengan restu keluarga, kami memilih melangkah bersama.', storyMarriageYear: '2026',
    dressCode: 'Sentuhan sage, krem, atau warna bumi akan membuat suasana semakin hangat.', gallery: [], videoUrl: '', giftBank: 'BCA', giftAccount: '1234567890', giftName: 'Amara Putri', theme: 'Hutan Hijau',
  };
  await connection.execute(`INSERT INTO invitations (user_id,slug,theme,completed,wedding_data) VALUES (?, 'amara-bima', ?, 1, ?) ON DUPLICATE KEY UPDATE slug='amara-bima',theme=VALUES(theme),completed=1,wedding_data=VALUES(wedding_data)`, [admin.id, wedding.theme, JSON.stringify(wedding)]);
  const [[invitation]] = await connection.execute('SELECT id FROM invitations WHERE user_id=?', [admin.id]);
  const [[count]] = await connection.execute('SELECT COUNT(*) AS count FROM guest_messages WHERE invitation_id=?', [invitation.id]);
  if (Number(count.count) === 0) {
    await connection.execute('INSERT INTO guest_messages (invitation_id,guest_name,attendance,message) VALUES (?,?,?,?)', [invitation.id, 'Nadia Rahma', 'Joyfully accepts', 'Selamat untuk Amara dan Bima! Semoga selalu bahagia.']);
    await connection.execute('INSERT INTO guest_messages (invitation_id,guest_name,attendance,message) VALUES (?,?,?,?)', [invitation.id, 'Rizky Maulana', 'Joyfully accepts', 'Tidak sabar merayakan hari istimewa kalian.']);
    await connection.execute('INSERT INTO guest_messages (invitation_id,guest_name,attendance,message) VALUES (?,?,?,?)', [invitation.id, 'Dewi Anggraini', 'Regretfully declines', 'Mohon maaf belum bisa hadir. Doa terbaik untuk kalian.']);
  }
  console.log('Database siap. Admin dan contoh undangan berhasil disiapkan.');
} finally { await connection.end(); }
