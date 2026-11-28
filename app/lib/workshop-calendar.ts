// Start-only event until the host confirms duration. No private access URL.
export const workshopRegistrationUrl = 'https://us02web.zoom.us/webinar/register/WN_komAAW4PRZKv8rUSSej2Ug';
export const workshopCalendarDescription = `Build Without Borrowing with Payton Wallace. Check your Zoom confirmation email for your unique join link. Webinar registration: ${workshopRegistrationUrl}`;
const start = '20261209T180000Z';
export function workshopGoogleCalendarUrl() {
 const params=new URLSearchParams({action:'TEMPLATE',text:'Build Without Borrowing',dates:`${start}/${start}`,details:workshopCalendarDescription,location:workshopRegistrationUrl,ctz:'America/Chicago'});
 return `https://calendar.google.com/calendar/render?${params}`;
}
export function workshopCalendarIcs() {
 const escape=(s:string)=>s.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
 const fold=(s:string)=>{let line='',out=''; for(const c of s){if(Buffer.byteLength(line+c)>75){out+=line+'\r\n';line=' ';}line+=c;}return out+line;};
 return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Fueled By Fire//Workshop//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:build-without-borrowing-december-2026@kingdomintel.com','DTSTAMP:20261125T000000Z',`DTSTART:${start}`,'SUMMARY:Build Without Borrowing',`DESCRIPTION:${escape(workshopCalendarDescription)}`,`LOCATION:${escape(workshopRegistrationUrl)}`,`URL:${workshopRegistrationUrl}`,'END:VEVENT','END:VCALENDAR'].map(fold).join('\r\n')+'\r\n';
}
