export type Wedding = {
  bride: string; groom: string; brideFather: string; brideMother: string; groomFather: string; groomMother: string;
  akadDate: string; akadTime: string; akadPlace: string; akadAddress: string; receptionDate: string; receptionTime: string;
  receptionPlace: string; receptionAddress: string; story: string; storyMeet: string; storyMeetYear: string;
  storyRelationship: string; storyRelationshipYear: string; storyMarriage: string; storyMarriageYear: string;
  dressCode: string; gallery: string[]; videoUrl: string; giftBank: string; giftAccount: string; giftName: string; theme: string;
};
export const emptyWedding: Wedding = {
  bride: '', groom: '', brideFather: '', brideMother: '', groomFather: '', groomMother: '', akadDate: '', akadTime: '', akadPlace: '', akadAddress: '', receptionDate: '', receptionTime: '', receptionPlace: '', receptionAddress: '', story: '', storyMeet: '', storyMeetYear: '', storyRelationship: '', storyRelationshipYear: '', storyMarriage: '', storyMarriageYear: '', dressCode: '', gallery: [], videoUrl: '', giftBank: '', giftAccount: '', giftName: '', theme: '',
};
export function invitationSlug(wedding: Pick<Wedding, 'bride' | 'groom'>) {
  return `${wedding.bride}-${wedding.groom}`.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'undangan';
}
