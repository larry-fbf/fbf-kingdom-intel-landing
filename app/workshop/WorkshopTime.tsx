'use client';
import {useEffect,useState} from 'react';
import {CENTRAL_ZONE,resolveDeviceZone} from '../lib/event-time';
import {WORKSHOP,formatWorkshopTime} from '../lib/workshop-event';
export default function WorkshopTime(){
 const [zone,setZone]=useState(CENTRAL_ZONE);
 useEffect(()=>setZone(resolveDeviceZone()),[]);
 const display=formatWorkshopTime(zone);
 return <time dateTime={WORKSHOP.startsAt} data-workshop-time data-time-zone={display.timeZone} aria-label={display.accessible}>{display.date}{' · '}<span style={{whiteSpace:'nowrap'}}>{display.time}</span></time>;
}
