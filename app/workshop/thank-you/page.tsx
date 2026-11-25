import {cookies} from 'next/headers';
import {COOKIE,verified} from '../../lib/workshop-registration';
import WorkshopThanks from '../WorkshopThanks';
export const metadata={title:'Registration status | Build Without Borrowing',robots:{index:false,follow:false}};
export default async function ThankYou(){const jar=await cookies();if(verified(jar.get(COOKIE)?.value))return <WorkshopThanks confirmed/>;return <main><h1>No registration verified</h1><a href='/workshop'>Back to workshop details</a></main>;}
