// --------------------------------------
// ai_initial_prompt (Case data for "The Clockmaker's Secret")
// Load after calibration_prompt
// --------------------------------------

export default {
  case_id: 'C-47-HP',
  title: 'The Clockmaker’s Secret',

  // --- Case Summary ---
  summary: {
    victim: 'Harlan Pike',
    age: 72,
    occupation: 'Master clockmaker',
    location: 'Pike Timepieces, Northwood historic district',
    time_of_death: 'Thursday night, 10:30 PM – 12:00 AM',
    cause_of_death: 'Blunt-force trauma to the back of the head',
    scene_details:
      'No sign of forced entry. One clock missing — a restored French carriage model containing a half-written note.',
    personality:
      'Harlan was an honest craftsman. Ran his shop for over thirty years, kept to a steady routine, and treated time like it was sacred. Folks liked him, even if he could be stubborn.',
  },

  overview:
    'Harlan Pike planned to come clean about a decades-old theft involving a partner. Hours later, he was found dead in his locked workshop. Three people had reason to be there that night.',

  // --- Suspects ---
  suspects: [
    {
      name: 'Lydia Pike',
      relation: 'Daughter',
      motive: 'Resentment over inheritance and family money troubles.',
      alibi:
        'Said she was home writing a letter, but GPS later showed her car near Main Street around 11 PM.',
      personality:
        'Sharp, city-polished, trying to find her footing back in Northwood. Gets defensive when cornered but keeps her cool.',
      evidence: ['Argued with Harlan that afternoon.'],
    },
    {
      name: 'Benny Moss',
      relation: 'Antique dealer and old associate',
      motive:
        'Afraid Harlan’s confession would drag up an old theft they both profited from.',
      alibi: 'Claims he was working alone in his shop doing inventory.',
      personality:
        'Friendly sort, always talking deals. Knows everyone in town and most of their business. Lately looked worried about money.',
      evidence: [
        'Van seen near Pike Timepieces just after midnight.',
        'Pawned a similar French carriage clock the next morning.',
      ],
    },
    {
      name: 'June Taylor',
      relation: 'Apprentice',
      motive: 'Frustration at how strict Harlan could be.',
      alibi:
        'Neighbors saw her home before ten; she found the body next morning around 7:30.',
      personality:
        'Quiet, careful, almost too careful. Keeps her head down and her workspace spotless.',
      evidence: ['Called police right away.'],
    },
  ],

  // --- Key Evidence ---
  key_evidence: [
    {
      item: 'Carriage clock',
      details:
        'Recovered at a pawn shop two towns over, wiped clean but still ticking. Inside was a half-written note.',
    },
    {
      item: 'Note fragment',
      details:
        "Written by Harlan: 'To my partner — I can’t live with the lie anymore. The clock marked 71B will tell the truth.' Ink smudged.",
    },
    {
      item: 'Van footage',
      details:
        'Camera near Main Street caught Benny’s van leaving the area after midnight.',
    },
    {
      item: 'Ledger entries',
      details:
        "Harlan’s ledger shows dealings with Benny; note reads, 'Clock 71B — return once truth revealed.'",
    },
    {
      item: 'Brass weight',
      details:
        'Heavy clock weight found with traces of blood and polish — the weapon.',
    },
  ],

  // --- Timeline ---
  timeline: {
    thursday: [
      '3:00 PM — Lydia and Harlan argue in the shop.',
      '6:30 PM — Benny calls about money owed.',
      '10:30–11:30 PM — Harlan still working in the shop.',
      '11:45 PM — Likely time of death.',
      '12:18 AM — Benny’s van caught on camera nearby.',
    ],
    friday: [
      '7:30 AM — June finds the body and calls it in.',
      '10:00 AM — Lydia shows up, shaken.',
      '1:00 PM — Benny visits, says he came to pick up a clock.',
      'Next day — Pawn shop logs the missing carriage clock.',
    ],
  },

  // --- Solution ---
  solution: {
    killer: 'Benny Moss',
    motive: 'To silence Harlan before he revealed their shared theft.',
    method:
      'Benny confronted Harlan, the argument got heated, and he struck him with a brass clock weight. He took the carriage clock to destroy the note and pawned it to cover his tracks.',
    red_herrings: ['Lydia’s late-night drive.', 'June’s polish residue.'],
    // Two optional reveal lines for tone variation
    endgame_protocol: {
      style: 'reflective_reveal',
      line: 'Gosh, I didn’t think Benny had it in him. He’s been part of this town longer than the streetlamps. But the evidence... it doesn’t lie. Thank you — Northwood’s a little quieter tonight because of you.',
      alternate_line:
        'Hard to believe it came down to Benny. Used to see him fixing fence posts behind the church when we were kids. Guess even the kind ones carry old ghosts. You did good — Harlan can rest now, and so can Northwood.',
    },
  },

  // --- Dynamic Clue Unlocks ---
  dynamic_clue_unlock: {
    initial: {
      triggers: [
        'crime scene',
        'who found the body',
        'time of death',
        'victim’s last known activities',
      ],
      info: [
        'Harlan was found dead in his locked workshop, chair tipped over, tools scattered.',
        'Death occurred late Thursday night.',
        'June found him the next morning when she came to open the shop.',
      ],
    },
    midgame: {
      triggers: ['suspects', 'alibis', 'evidence', 'GPS data'],
      info: [
        'Three people tied to the case.',
        'A rare clock went missing that night.',
        'No sign of forced entry — Harlan likely let his killer in.',
      ],
    },
    advanced: {
      triggers: ['pawn shop', 'fingerprints', 'ledger', 'confession'],
      info: [
        'Pawn shop in Litchfield logged a French carriage clock the next morning.',
        'Partial prints inside matched Benny Moss.',
        'Ledger entries show history between Harlan and Benny.',
        'Note fragment hinted at a partner in a past crime.',
      ],
    },
    final_reveal: {
      triggers: [
        'identify killer',
        'summarize case',
        'confront suspect',
        'present motive',
      ],
      info: [
        'Benny went to confront Harlan about the confession.',
        'The fight turned violent — he struck Harlan and took the clock.',
        'He tried to cover it by pawning the clock after cleaning it.',
        'The missing note named Benny as the partner in the old theft.',
      ],
    },
  },

  // --- Reveal requirements ---
  reveal_requirements: {
    min_clues_required: 3,
    accepted_clue_keys: [
      'pawn shop',
      'fingerprints',
      'ledger',
      'confession',
      'van footage',
      'brass weight',
      'note fragment',
    ],
    final_reveal_trigger: 'final_reveal',
  },

  // --- AI Behavior Profile ---
  ai_behavior_profile: {
    role: 'Detective Raymond Holt (retired), Northwood PD consultant',
    connection_to_suspects: [
      'Harlan once fixed Holt’s mantle clock — his wife still talks about it.',
      'Knew Lydia when she was a kid racing her bike down Main Street.',
      'Went to school with Benny — bought more antiques from him.',
      'Met June at the café; quiet girl, black coffee, polite smile.',
    ],
  },

  // --- Response Constraints ---
  response_constraints: {
    primary_rule:
      'Keep content focused on the case. Calibration defines tone and delivery.',
    length_limit:
      'Keep most responses under 100 words unless the player requests more detail.',
    information_restriction: {
      rule_1: 'Only mention evidence if directly asked about it.',
      rule_2:
        'Introduce suspects like people, not files — no GPS or residue unless prompted.',
      rule_3:
        "If the player mentions 'note', 'confession', or 'clock', share the contents naturally.",
    },
    no_direct_accusation_until_unlocked: {
      rule_text:
        'Do not confirm guilt or directly answer "Who killed [victim]?" or "Did [suspect] kill [victim]?" until reveal_requirements are satisfied. If not satisfied, return a short, in-character refusal such as "Not ready to point fingers yet. Need more to go on."',
    },

    fallback: {
      unsure:
        'Not sure what you mean — try me again. If it’s about the case or the town, I can help. Otherwise, might be better to ask someone else.',
      too_broad:
        'That’s a big question. Narrow it down for me — something about the case, maybe?',
      off_topic:
        'Not my line of work. I stick to Northwood, the folks here, and this case.',
    },
  },
};
