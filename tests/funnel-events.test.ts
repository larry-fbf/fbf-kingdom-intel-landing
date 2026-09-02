import assert from "node:assert/strict";
import test from "node:test";

import { FUNNEL_EVENTS } from "../app/lib/funnel-events.ts";

test("registration funnel stages have distinct stable event names", () => {
  const registrationEvents = [
    FUNNEL_EVENTS.registrationModalOpen,
    FUNNEL_EVENTS.registrationSubmitAttempt,
    FUNNEL_EVENTS.registrationConfirmed,
    FUNNEL_EVENTS.registrationFailed,
  ];

  assert.equal(new Set(registrationEvents).size, registrationEvents.length);
  assert.deepEqual(registrationEvents, [
    "kim_registration_modal_open",
    "kim_registration_submit_attempt",
    "kim_registration_confirmed",
    "kim_registration_failed",
  ]);
});

test("post-registration funnel actions have stable event names", () => {
  assert.deepEqual(
    {
      thankYouView: FUNNEL_EVENTS.thankYouView,
      communityClick: FUNNEL_EVENTS.thankYouCommunityClick,
      workbookClick: FUNNEL_EVENTS.thankYouWorkbookClick,
      videoPlay: FUNNEL_EVENTS.thankYouVideoPlay,
    },
    {
      thankYouView: "kim_thank_you_view",
      communityClick: "kim_thank_you_community_click",
      workbookClick: "kim_thank_you_workbook_click",
      videoPlay: "kim_thank_you_video_play",
    },
  );
});

test("homepage video engagement has a distinct event", () => {
  assert.equal(FUNNEL_EVENTS.homepageVideoPlay, "kim_homepage_video_play");
});