import {createZoomProvider} from './zoom-provider.ts';
import {registerZoomSignup,type ZoomContact,type ZoomOutcome,type ZoomTarget} from './zoom-signup.ts';
// Read-only verified webinar, not a meeting. Never read January ZOOM_SIGNUP_TARGET.
export const WORKSHOP_ZOOM_TARGET: ZoomTarget = {
 webinarId:'81398970006',topic:'Kingdom Intelligence Workshop',timezone:'America/Chicago',
 webinarType:5,occurrenceId:'',startTime:'2026-12-09T18:00:00Z',
 hostId:'BvkkU0IDT7mg8KrjcCbIyQ',
 registrationUrl:'https://us02web.zoom.us/webinar/register/WN_komAAW4PRZKv8rUSSej2Ug',
};
export async function registerWorkshopZoom(contact:ZoomContact,env:Record<string,string|undefined>=process.env,fetcher:typeof fetch=fetch):Promise<ZoomOutcome>{
 if(!env.ZOOM_ACCOUNT_ID||!env.ZOOM_CLIENT_ID||!env.ZOOM_CLIENT_SECRET)return {status:'unavailable'};
 const provider=createZoomProvider({accountId:env.ZOOM_ACCOUNT_ID,clientId:env.ZOOM_CLIENT_ID,clientSecret:env.ZOOM_CLIENT_SECRET},fetcher);
 return registerZoomSignup(contact,WORKSHOP_ZOOM_TARGET,provider);
}
