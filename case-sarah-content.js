// ============================================================
// TASK 1: Sarah's Clue Messages (rewritten in-voice)
// Drop these into wherever case-sarah.js keys story-critical texts
// ============================================================

const clueMessages = {
  clue1: "at the dock. leo doesnt know im here. check the folder pls",
  clue2: "if i dont text u by 2 delete the backup. im serious",
  clue3: "he thinks im still in the house",
  clue4: "check the timestamp on the dock photo. thats the whole thing",
};

// ============================================================
// TASK 2: Garbage Data — Messages app noise threads
// ============================================================

const chats = {
  mom: {
    name: "Mom",
    avatarInitial: "M",
    messages: [
      { from: "them", text: "did u take the chicken out", time: "9:14 AM" },
      { from: "me", text: "not yet", time: "9:20 AM" },
      { from: "them", text: "sarah", time: "9:21 AM" },
      { from: "them", text: "SARAH", time: "9:21 AM" },
      { from: "me", text: "omg ok taking it out now", time: "9:45 AM" },
      { from: "them", text: "thank u. also come to dinner sunday ur aunt is asking about u again", time: "11:02 AM" },
      { from: "them", text: "she thinks ur still w that boy", time: "11:03 AM" },
      { from: "me", text: "mom i love u but not rn", time: "11:40 AM" },
      { from: "them", text: "call me when u can", time: "3:15 PM" },
    ],
  },

  jake: {
    name: "Jake (Work)",
    avatarInitial: "J",
    messages: [
      { from: "them", text: "hey can u cover my closing shift thurs", time: "Mon 6:02 PM" },
      { from: "me", text: "i already did one for u last wk lol", time: "Mon 6:10 PM" },
      { from: "them", text: "i knowwww i owe u. brandon's been on my ass about the schedule", time: "Mon 6:11 PM" },
      { from: "me", text: "fine but u owe me starbucks", time: "Mon 6:15 PM" },
      { from: "them", text: "deal. also do u still have the office key or did u give it back to nancy", time: "Wed 10:22 AM" },
      { from: "me", text: "i have it, why", time: "Wed 10:30 AM" },
      { from: "them", text: "locked myself out again lol can u bring it thurs", time: "Wed 10:31 AM" },
      { from: "me", text: "ur a mess but yes", time: "Wed 10:40 AM" },
    ],
  },

  spam: {
    name: "68453",
    avatarInitial: "#",
    messages: [
      { from: "them", text: "Your carrier alert: You've used 90% of your monthly data. Reply STOP to opt out of alerts.", time: "Tue 8:00 AM" },
      { from: "them", text: "Your verification code is 483920. Do not share this code with anyone.", time: "Thu 4:12 PM" },
      { from: "them", text: "FINAL NOTICE: Your package delivery requires action. Confirm details: [link removed]", time: "Fri 1:03 PM" },
    ],
  },

  groupChat: {
    name: "the noise 🐛",
    avatarInitial: "🐛",
    messages: [
      { from: "Priya", text: "ok so are we still doing fri or", time: "2:11 PM" },
      { from: "Deja", text: "fri works for me", time: "2:13 PM" },
      { from: "me", text: "fri is good just not too late i have stuff sat morning", time: "2:14 PM" },
      { from: "Priya", text: "‘stuff’ 👀", time: "2:14 PM" },
      { from: "me", text: "STOP", time: "2:15 PM" },
      { from: "Deja", text: "wait who's bringing cups this time bc last time NO ONE did and we drank out the bottle like animals", time: "2:20 PM" },
      { from: "Priya", text: "not it", time: "2:20 PM" },
      { from: "me", text: "not it", time: "2:21 PM" },
      { from: "Deja", text: "i hate both of u so much. fine ill bring cups AGAIN", time: "2:22 PM" },
      { from: "Priya", text: "ur a real one deja", time: "2:23 PM" },
      { from: "Deja", text: "someone remind me thursday i will forget", time: "2:24 PM" },
    ],
  },
};

// ============================================================
// TASK 3: Notes App Dump
// ============================================================

const notes = [
  {
    title: "grocery / door stuff",
    date: "Edited 2d ago",
    body: "eggs\noat milk\nthe good bread not the cheap one\nfront door code is still 0417 til landlord changes it\ndry cleaning ticket # somewhere in my bag check that first",
  },
  {
    title: "",
    date: "Edited 6h ago",
    body: "leo i dont even know how to say this without it sounding\n\nok starting over\n\nmarcus if ur reading this instead i need you to und",
  },
  {
    title: "wifi / random",
    date: "Edited 1w ago",
    body: "lake house wifi: SunsetDock22\n\nwhy do i always forget this\n\nalso: ask denise about the thing she said at the party bc that was weird right? or am i overthinking",
  },
];

// ============================================================
// Export (adjust to however engine.js expects CASE data)
// ============================================================

module.exports = { clueMessages, chats, notes };
