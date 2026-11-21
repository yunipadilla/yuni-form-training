const TRAINER_PROGRAM = {
  "id": "yuni-fitness-v1-w1-3",
  "name": "Fitness Program V1",
  "weeks": 3,
  "phase": "Muscular endurance",
  "note": "Weeks 1–3: muscular endurance. Monday threshold run; Tuesday lower-emphasis strength; Wednesday Zone 2 + core; Thursday upper-emphasis strength; Friday speed run; Saturday HYROX; Sunday rest / active recovery.",
  "periodization": "Week 1-3: Muscular Endurance\nWeek 4-8: Muscular Strength + Hypertrophy\nWeek 9: Deload Week\nWeek 10-12: Power\n",
  "sourceName": "Yuni Padilla – Fitness Program V1",
  "coverage": "Detailed sessions are available for Weeks 1–3. Weeks 4–12 appear in the phase overview; detailed workouts are not provided.",
  "weekDays": {
    "1": [
      {
        "id": "coach-w1-mon",
        "weekday": "MON",
        "name": "Threshold run",
        "type": "Running · intervals",
        "sport": "run",
        "minutes": null,
        "note": "Threshold Run Week 1\n\nWarm up 10 min. RPE 1-3\n4 x 20 sec. strides RPE 9-10\n\n3 x 4 min. RPE 8\n\nCool Down 5 min. RPE 1-2",
        "exercises": [
          {
            "id": "coach-w1-mon-warmup",
            "name": "Warm-up",
            "sets": 1,
            "reps": "10",
            "unit": "min",
            "note": "RPE 1–3"
          },
          {
            "id": "coach-w1-mon-strides",
            "name": "Strides",
            "sets": 4,
            "reps": "20",
            "unit": "sec",
            "note": "RPE 9–10. Recovery between strides is not specified in the workbook."
          },
          {
            "id": "coach-w1-mon-threshold",
            "name": "Threshold intervals",
            "sets": 3,
            "reps": "4",
            "unit": "min",
            "note": "RPE 8. Recovery between intervals is not specified in the workbook."
          },
          {
            "id": "coach-w1-mon-cooldown",
            "name": "Cool down",
            "sets": 1,
            "reps": "5",
            "unit": "min",
            "note": "RPE 1–2"
          }
        ],
        "source": "Runs + Cardio!A3"
      },
      {
        "id": "coach-w1-tue",
        "weekday": "TUE",
        "name": "Full body strength · Lower emphasis",
        "type": "Strength · paired A–D exercises",
        "minutes": null,
        "note": "Notes: The big goal with these workouts is to push your muscles past the breaking point through reps, not weight. You should feel like the first \n4-6 reps are really easy, and then hate the exercise and barely be able to finish by the final reps. SO GO HEAVY, but be able to hit the rep scheme. \nIf you fail, drop a little bit and keep going. Finish the reps no matter what. We are focusing on Muscular Endurance & building that Threshold.",
        "exercises": [
          {
            "id": "coach-w1-B-warmup",
            "name": "Warm up as needed",
            "sets": 1,
            "reps": "As needed",
            "unit": "as prescribed",
            "note": ""
          },
          {
            "id": "coach-w1-B7",
            "name": "A1: Barbell Back Squat",
            "sets": 3,
            "reps": "12",
            "unit": "reps",
            "note": "Maintain reps go lighter if needed\nSTAY FUCKING LOW"
          },
          {
            "id": "coach-w1-B8",
            "name": "A2: Mini Band Monster Walk",
            "sets": 3,
            "reps": "30s both ways",
            "unit": "as prescribed",
            "note": ""
          },
          {
            "id": "coach-w1-B9",
            "name": "B1: Hip Thrust",
            "sets": 3,
            "reps": "10+10+10",
            "unit": "reps",
            "note": "10 full reps - 10s hold at top - 10 pulse\nMaintain reps go lighter if needed"
          },
          {
            "id": "coach-w1-B10",
            "name": "B2: Barbell Row",
            "sets": 3,
            "reps": "12",
            "unit": "reps",
            "note": ""
          },
          {
            "id": "coach-w1-B11",
            "name": "C1: DB Thrusters",
            "sets": 3,
            "reps": "15",
            "unit": "reps",
            "note": "goodluck\ngo heavy and embrace the shake"
          },
          {
            "id": "coach-w1-B12",
            "name": "C2: DB Split Squat ISO hold",
            "sets": 3,
            "reps": "30s ea.",
            "unit": "as prescribed",
            "note": ""
          },
          {
            "id": "coach-w1-B13",
            "name": "D1: Machine Chest Press",
            "sets": 3,
            "reps": "8+10+12",
            "unit": "reps",
            "note": "Drive good form -- no compensation\nfull stretch on the lats"
          },
          {
            "id": "coach-w1-B14",
            "name": "D2: Machine SA Chest Supported Row",
            "sets": 3,
            "reps": "10+10",
            "unit": "reps",
            "note": ""
          }
        ],
        "source": "Full Body Strength Days!B3:H15"
      },
      {
        "id": "coach-w1-wed-bike",
        "weekday": "WED",
        "slot": "zone2",
        "mode": "bike",
        "sport": "bike",
        "name": "Zone 2 bike + core",
        "type": "Zone 2 cardio + core",
        "minutes": null,
        "cardioMinutes": 60,
        "note": "Wednesday Zone 2 slot replaces the run with a trainer-listed alternative. Select one option, not an additional workout. Core work stays in this session.\nAlternate Zone 2 Cardio Options:\n- 3 Rounds (10min. Assault Bike @ RPE 4-5 + 5min. Row Erg @ RPE 5)\n- 60 min. Bike (RPM 75+ HR-Z2)\n- 45 min. Swim (easy)",
        "exercises": [
          {
            "id": "coach-w1-wed-bike-bike",
            "name": "Zone 2 bike",
            "sets": 1,
            "reps": "60",
            "unit": "min",
            "note": "RPM 75+ · HR–Z2. From the trainer’s alternate cardio options."
          },
          {
            "id": "coach-w1-wed-bike-core-3",
            "name": "A1: Hang Leg Raises",
            "sets": 4,
            "reps": "TIll Failure",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w1-wed-bike-core-4",
            "name": "A2: Weighted Ab Roll Out",
            "sets": 4,
            "reps": "15",
            "unit": "reps",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w1-wed-bike-core-5",
            "name": "A3: Stir the Pot on Med Ball",
            "sets": 4,
            "reps": "10 ea.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w1-wed-bike-core-6",
            "name": "A4: Low Plank Hold",
            "sets": 4,
            "reps": "45 sec.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          }
        ],
        "source": "Runs + Cardio!H19; L3:N6"
      },
      {
        "id": "coach-w1-thu",
        "weekday": "THU",
        "name": "Full body strength · Upper emphasis",
        "type": "Strength · paired A–D exercises",
        "minutes": null,
        "note": "Notes: Same thing as V1.\nNotes: The big goal with these workouts is to push your muscles past the breaking point through reps, not weight. You should feel like the first \n4-6 reps are really easy, and then hate the exercise and barely be able to finish by the final reps. SO GO HEAVY, but be able to hit the rep scheme. \nIf you fail, drop a little bit and keep going. Finish the reps no matter what. We are focusing on Muscular Endurance & building that Threshold.",
        "exercises": [
          {
            "id": "coach-w1-J-warmup",
            "name": "Warm up as needed",
            "sets": 1,
            "reps": "As needed",
            "unit": "as prescribed",
            "note": ""
          },
          {
            "id": "coach-w1-J7",
            "name": "A1: Barbell Bench Press",
            "sets": 3,
            "reps": "12+12+TF",
            "unit": "reps",
            "note": "2x drop set w/ DB's --> PU's TF\nHEAVY for 6 into AMRAP BW"
          },
          {
            "id": "coach-w1-J8",
            "name": "A2: Australian Pull ups",
            "sets": 3,
            "reps": "6+TF",
            "unit": "reps",
            "note": ""
          },
          {
            "id": "coach-w1-J9",
            "name": "B1: BB Walking Lunges",
            "sets": 3,
            "reps": "50m",
            "unit": "as prescribed",
            "note": "Keep core tight + keep elbows high\nLegs should be shaking"
          },
          {
            "id": "coach-w1-J10",
            "name": "B2: DB RDL's",
            "sets": 3,
            "reps": "12+12",
            "unit": "reps",
            "note": ""
          },
          {
            "id": "coach-w1-J11",
            "name": "C1: SA KB Clean to Push Press",
            "sets": 3,
            "reps": "12 each side",
            "unit": "as prescribed",
            "note": "Quarter Squat for the push press\nAll one arm then the other"
          },
          {
            "id": "coach-w1-J12",
            "name": "C2: KB Gorilla Row",
            "sets": 3,
            "reps": "15ea.",
            "unit": "as prescribed",
            "note": ""
          },
          {
            "id": "coach-w1-J13",
            "name": "D1: Suitcase Carry",
            "sets": 3,
            "reps": "70m",
            "unit": "as prescribed",
            "note": "Shoulders back\nChest Up"
          },
          {
            "id": "coach-w1-J14",
            "name": "D2: DB Reverse Fly's",
            "sets": 3,
            "reps": "12ea.",
            "unit": "as prescribed",
            "note": ""
          }
        ],
        "source": "Full Body Strength Days!J3:P15"
      },
      {
        "id": "coach-w1-fri",
        "weekday": "FRI",
        "name": "Speed run",
        "type": "Running · intervals",
        "sport": "run",
        "minutes": null,
        "note": "Speed Run Week 1\n\nWarm-up 10 min. RPE 1-2\n4 x 20 sec. strides RPE 9-10\n\nAS FAST AS POSSIBLE:\n2 x 400m w/ 1 min. rest\n2min. rest\n4 x 200m w/ 1 min. rest\n2min. rest\n4 x 100m w/ 1 min. rest\n2 min. rest\n2 x 400m w/ 1 min. rest\n\nCool Down 5 min. RPE 1-2",
        "exercises": [
          {
            "id": "coach-w1-fri-warmup",
            "name": "Warm-up",
            "sets": 1,
            "reps": "10",
            "unit": "min",
            "note": "RPE 1–2"
          },
          {
            "id": "coach-w1-fri-strides",
            "name": "Strides",
            "sets": 4,
            "reps": "20",
            "unit": "sec",
            "note": "RPE 9–10. Recovery between strides is not specified in the workbook."
          },
          {
            "id": "coach-w1-fri-intervals-0",
            "name": "Interval group 1",
            "sets": 2,
            "reps": "400",
            "unit": "m",
            "note": "AS FAST AS POSSIBLE. 1 min rest between repeats. 2 min rest after this group."
          },
          {
            "id": "coach-w1-fri-intervals-1",
            "name": "Interval group 2",
            "sets": 4,
            "reps": "200",
            "unit": "m",
            "note": "AS FAST AS POSSIBLE. 1 min rest between repeats. 2 min rest after this group."
          },
          {
            "id": "coach-w1-fri-intervals-2",
            "name": "Interval group 3",
            "sets": 4,
            "reps": "100",
            "unit": "m",
            "note": "AS FAST AS POSSIBLE. 1 min rest between repeats. 2 min rest after this group."
          },
          {
            "id": "coach-w1-fri-intervals-3",
            "name": "Interval group 4",
            "sets": 2,
            "reps": "400",
            "unit": "m",
            "note": "AS FAST AS POSSIBLE. 1 min rest between repeats."
          },
          {
            "id": "coach-w1-fri-cooldown",
            "name": "Cool down",
            "sets": 1,
            "reps": "5",
            "unit": "min",
            "note": "RPE 1–2"
          }
        ],
        "source": "Runs + Cardio!A18"
      },
      {
        "id": "coach-w1-sat",
        "weekday": "SAT",
        "name": "HYROX · 4-round circuit",
        "type": "HYROX circuit",
        "sport": "hyrox",
        "minutes": null,
        "note": "HYROX CIRCUIT WEEK 1\n\nBuy-In: 1000m Run @ 80%\n\n4 Rounds:\n- 500m SkiErg or 20 Burpee to Plate\n- 10 Alt. DB Snatch ea. (25lbs.)\n- 40yd. DB Walking Lunges (15lbs.)\n- 10 2-squats-to-box-jump\n- KB Gorilla Rows\n",
        "exercises": [
          {
            "id": "coach-w1-sat-buyin",
            "name": "Buy-in run",
            "sets": 1,
            "reps": "1000",
            "unit": "m",
            "note": "80% effort. Complete before the circuit."
          },
          {
            "id": "coach-w1-sat-ski",
            "name": "SkiErg or burpee to plate",
            "sets": 4,
            "reps": "500m SkiErg OR 20 burpees",
            "unit": "as prescribed",
            "note": "One station per round."
          },
          {
            "id": "coach-w1-sat-snatch",
            "name": "Alternating DB snatch",
            "sets": 4,
            "reps": "10 each",
            "unit": "reps",
            "note": "25 lb prescribed."
          },
          {
            "id": "coach-w1-sat-lunge",
            "name": "DB walking lunges",
            "sets": 4,
            "reps": "40",
            "unit": "yd",
            "note": "15 lb prescribed."
          },
          {
            "id": "coach-w1-sat-jump",
            "name": "2-squats-to-box-jump",
            "sets": 4,
            "reps": "10",
            "unit": "reps",
            "note": ""
          },
          {
            "id": "coach-w1-sat-gorilla",
            "name": "KB gorilla rows",
            "sets": 4,
            "reps": "Not specified",
            "unit": "as prescribed",
            "note": "The workbook does not specify reps or weight. Confirm with your trainer."
          }
        ],
        "source": "HYROX Circuits!B4"
      },
      {
        "id": "coach-w1-sun",
        "weekday": "SUN",
        "name": "Rest / active recovery",
        "type": "Recovery",
        "minutes": 0,
        "note": "Sunday: rest or active recovery, as listed in the trainer’s split.",
        "exercises": [],
        "source": "Periodization!D19:D21"
      }
    ],
    "2": [
      {
        "id": "coach-w2-mon",
        "weekday": "MON",
        "name": "Threshold run",
        "type": "Running · intervals",
        "sport": "run",
        "minutes": null,
        "note": "Threshold Run Week 2\n\nWarm up 12 min. RPE 1-3\n4 x 20 sec. strides RPE 9-10\n\n3 x 4 min. RPE 8\n\nCool Down 10 min. RPE 1-2",
        "exercises": [
          {
            "id": "coach-w2-mon-warmup",
            "name": "Warm-up",
            "sets": 1,
            "reps": "12",
            "unit": "min",
            "note": "RPE 1–3"
          },
          {
            "id": "coach-w2-mon-strides",
            "name": "Strides",
            "sets": 4,
            "reps": "20",
            "unit": "sec",
            "note": "RPE 9–10. Recovery between strides is not specified in the workbook."
          },
          {
            "id": "coach-w2-mon-threshold",
            "name": "Threshold intervals",
            "sets": 3,
            "reps": "4",
            "unit": "min",
            "note": "RPE 8. Recovery between intervals is not specified in the workbook."
          },
          {
            "id": "coach-w2-mon-cooldown",
            "name": "Cool down",
            "sets": 1,
            "reps": "10",
            "unit": "min",
            "note": "RPE 1–2"
          }
        ],
        "source": "Runs + Cardio!C3"
      },
      {
        "id": "coach-w2-tue",
        "weekday": "TUE",
        "name": "Full body strength · Lower emphasis",
        "type": "Strength · paired A–D exercises",
        "minutes": null,
        "note": "Notes: The big goal with these workouts is to push your muscles past the breaking point through reps, not weight. You should feel like the first \n4-6 reps are really easy, and then hate the exercise and barely be able to finish by the final reps. SO GO HEAVY, but be able to hit the rep scheme. \nIf you fail, drop a little bit and keep going. Finish the reps no matter what. We are focusing on Muscular Endurance & building that Threshold.",
        "exercises": [
          {
            "id": "coach-w2-B-warmup",
            "name": "Warm up as needed",
            "sets": 1,
            "reps": "As needed",
            "unit": "as prescribed",
            "note": ""
          },
          {
            "id": "coach-w2-B7",
            "name": "A1: Barbell Back Squat",
            "sets": 3,
            "reps": "12",
            "unit": "reps",
            "note": "Maintain reps go lighter if needed\nSTAY FUCKING LOW"
          },
          {
            "id": "coach-w2-B8",
            "name": "A2: Mini Band Monster Walk",
            "sets": 3,
            "reps": "30s both ways",
            "unit": "as prescribed",
            "note": ""
          },
          {
            "id": "coach-w2-B9",
            "name": "B1: Hip Thrust",
            "sets": 3,
            "reps": "10+10+10",
            "unit": "reps",
            "note": "10 full reps - 10s hold at top - 10 pulse\nMaintain reps go lighter if needed"
          },
          {
            "id": "coach-w2-B10",
            "name": "B2: Barbell Row",
            "sets": 3,
            "reps": "12",
            "unit": "reps",
            "note": ""
          },
          {
            "id": "coach-w2-B11",
            "name": "C1: DB Thrusters",
            "sets": 3,
            "reps": "15",
            "unit": "reps",
            "note": "goodluck\ngo heavy and embrace the shake"
          },
          {
            "id": "coach-w2-B12",
            "name": "C2: DB Split Squat ISO hold",
            "sets": 3,
            "reps": "30s ea.",
            "unit": "as prescribed",
            "note": ""
          },
          {
            "id": "coach-w2-B13",
            "name": "D1: Machine Chest Press",
            "sets": 3,
            "reps": "8+10+12",
            "unit": "reps",
            "note": "Drive good form -- no compensation\nfull stretch on the lats"
          },
          {
            "id": "coach-w2-B14",
            "name": "D2: Machine SA Chest Supported Row",
            "sets": 3,
            "reps": "10+10",
            "unit": "reps",
            "note": ""
          }
        ],
        "source": "Full Body Strength Days!B3:H15"
      },
      {
        "id": "coach-w2-wed-swim",
        "weekday": "WED",
        "slot": "zone2",
        "mode": "swim",
        "sport": "swim",
        "name": "Easy swim + core",
        "type": "Zone 2 cardio + core",
        "minutes": null,
        "cardioMinutes": 45,
        "note": "Wednesday Zone 2 slot replaces the run with a trainer-listed alternative. Select one option, not an additional workout. Core work stays in this session.\nAlternate Zone 2 Cardio Options:\n- 3 Rounds (10min. Assault Bike @ RPE 4-5 + 5min. Row Erg @ RPE 5)\n- 60 min. Bike (RPM 75+ HR-Z2)\n- 45 min. Swim (easy)",
        "exercises": [
          {
            "id": "coach-w2-wed-swim-swim",
            "name": "Easy swim",
            "sets": 1,
            "reps": "45",
            "unit": "min",
            "note": "Easy effort. Distance, stroke, and interval structure are not specified in the workbook."
          },
          {
            "id": "coach-w2-wed-swim-core-8",
            "name": "A1: Hang Leg Raises",
            "sets": 4,
            "reps": "TIll Failure",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w2-wed-swim-core-9",
            "name": "A2: Weighted Ab Roll Out",
            "sets": 4,
            "reps": "15",
            "unit": "reps",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w2-wed-swim-core-10",
            "name": "A3: Stir the Pot on Med Ball",
            "sets": 4,
            "reps": "10 ea.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w2-wed-swim-core-11",
            "name": "A4: Low Plank Hold",
            "sets": 4,
            "reps": "45 sec.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          }
        ],
        "source": "Runs + Cardio!H19; L8:N11"
      },
      {
        "id": "coach-w2-thu",
        "weekday": "THU",
        "name": "Full body strength · Upper emphasis",
        "type": "Strength · paired A–D exercises",
        "minutes": null,
        "note": "Notes: Same thing as V1.\nNotes: The big goal with these workouts is to push your muscles past the breaking point through reps, not weight. You should feel like the first \n4-6 reps are really easy, and then hate the exercise and barely be able to finish by the final reps. SO GO HEAVY, but be able to hit the rep scheme. \nIf you fail, drop a little bit and keep going. Finish the reps no matter what. We are focusing on Muscular Endurance & building that Threshold.",
        "exercises": [
          {
            "id": "coach-w2-J-warmup",
            "name": "Warm up as needed",
            "sets": 1,
            "reps": "As needed",
            "unit": "as prescribed",
            "note": ""
          },
          {
            "id": "coach-w2-J7",
            "name": "A1: Barbell Bench Press",
            "sets": 3,
            "reps": "12+12+TF",
            "unit": "reps",
            "note": "2x drop set w/ DB's --> PU's TF\nHEAVY for 6 into AMRAP BW"
          },
          {
            "id": "coach-w2-J8",
            "name": "A2: Australian Pull ups",
            "sets": 3,
            "reps": "6+TF",
            "unit": "reps",
            "note": ""
          },
          {
            "id": "coach-w2-J9",
            "name": "B1: BB Walking Lunges",
            "sets": 3,
            "reps": "50m",
            "unit": "as prescribed",
            "note": "Keep core tight + keep elbows high\nLegs should be shaking"
          },
          {
            "id": "coach-w2-J10",
            "name": "B2: DB RDL's",
            "sets": 3,
            "reps": "12+12",
            "unit": "reps",
            "note": ""
          },
          {
            "id": "coach-w2-J11",
            "name": "C1: SA KB Clean to Push Press",
            "sets": 3,
            "reps": "12 each side",
            "unit": "as prescribed",
            "note": "Quarter Squat for the push press\nAll one arm then the other"
          },
          {
            "id": "coach-w2-J12",
            "name": "C2: KB Gorilla Row",
            "sets": 3,
            "reps": "15ea.",
            "unit": "as prescribed",
            "note": ""
          },
          {
            "id": "coach-w2-J13",
            "name": "D1: Suitcase Carry",
            "sets": 3,
            "reps": "70m",
            "unit": "as prescribed",
            "note": "Shoulders back\nChest Up"
          },
          {
            "id": "coach-w2-J14",
            "name": "D2: DB Reverse Fly's",
            "sets": 3,
            "reps": "12ea.",
            "unit": "as prescribed",
            "note": ""
          }
        ],
        "source": "Full Body Strength Days!J3:P15"
      },
      {
        "id": "coach-w2-fri",
        "weekday": "FRI",
        "name": "Speed run",
        "type": "Running · intervals",
        "sport": "run",
        "minutes": null,
        "note": "Speed Run Week 2\n\nWarm-up 10 min. RPE 1-2\n4 x 20 sec. strides RPE 9-10\n\nAS FAST AS POSSIBLE:\n1 x 800m \n2min. rest\n4 x 200m w/ 1 min. rest\n2min. rest\n4 x 100m w/ 1 min. rest\n2 min. rest\n1 x 800m\n\nCool Down 10 min. RPE 1-2",
        "exercises": [
          {
            "id": "coach-w2-fri-warmup",
            "name": "Warm-up",
            "sets": 1,
            "reps": "10",
            "unit": "min",
            "note": "RPE 1–2"
          },
          {
            "id": "coach-w2-fri-strides",
            "name": "Strides",
            "sets": 4,
            "reps": "20",
            "unit": "sec",
            "note": "RPE 9–10. Recovery between strides is not specified in the workbook."
          },
          {
            "id": "coach-w2-fri-intervals-0",
            "name": "Interval group 1",
            "sets": 1,
            "reps": "800",
            "unit": "m",
            "note": "AS FAST AS POSSIBLE. 2 min rest after this group."
          },
          {
            "id": "coach-w2-fri-intervals-1",
            "name": "Interval group 2",
            "sets": 4,
            "reps": "200",
            "unit": "m",
            "note": "AS FAST AS POSSIBLE. 1 min rest between repeats. 2 min rest after this group."
          },
          {
            "id": "coach-w2-fri-intervals-2",
            "name": "Interval group 3",
            "sets": 4,
            "reps": "100",
            "unit": "m",
            "note": "AS FAST AS POSSIBLE. 1 min rest between repeats. 2 min rest after this group."
          },
          {
            "id": "coach-w2-fri-intervals-3",
            "name": "Interval group 4",
            "sets": 1,
            "reps": "800",
            "unit": "m",
            "note": "AS FAST AS POSSIBLE."
          },
          {
            "id": "coach-w2-fri-cooldown",
            "name": "Cool down",
            "sets": 1,
            "reps": "10",
            "unit": "min",
            "note": "RPE 1–2"
          }
        ],
        "source": "Runs + Cardio!C18"
      },
      {
        "id": "coach-w2-sat",
        "weekday": "SAT",
        "name": "HYROX · 30-minute AMRAP",
        "type": "HYROX circuit",
        "sport": "hyrox",
        "minutes": null,
        "note": "HYROX CIRCUIT WEEK 2\n\nAMRAP 30min. \n\n- 400m Run \n- 20 yd Sled Push @ 200lbs.\n- 12 Burpee to Box Jump \n- 12 Alt. DB Rev. Lunges",
        "exercises": [
          {
            "id": "coach-w2-sat-run",
            "name": "Run",
            "sets": 1,
            "reps": "400",
            "unit": "m",
            "note": "Each AMRAP round. Log total rounds in the session fields."
          },
          {
            "id": "coach-w2-sat-sled",
            "name": "Sled push",
            "sets": 1,
            "reps": "20",
            "unit": "yd",
            "note": "200 lb prescribed. Each AMRAP round."
          },
          {
            "id": "coach-w2-sat-burpee",
            "name": "Burpee to box jump",
            "sets": 1,
            "reps": "12",
            "unit": "reps",
            "note": "Each AMRAP round."
          },
          {
            "id": "coach-w2-sat-lunge",
            "name": "Alternating DB reverse lunges",
            "sets": 1,
            "reps": "12",
            "unit": "reps",
            "note": "Each AMRAP round. Weight is not specified."
          }
        ],
        "source": "HYROX Circuits!F4"
      },
      {
        "id": "coach-w2-sun",
        "weekday": "SUN",
        "name": "Rest / active recovery",
        "type": "Recovery",
        "minutes": 0,
        "note": "Sunday: rest or active recovery, as listed in the trainer’s split.",
        "exercises": [],
        "source": "Periodization!D19:D21"
      }
    ],
    "3": [
      {
        "id": "coach-w3-mon",
        "weekday": "MON",
        "name": "Threshold run",
        "type": "Running · intervals",
        "sport": "run",
        "minutes": null,
        "note": "Source heading check: this is the third threshold column (E3), which is labeled “Week 1” in the workbook. Shown in Week 3 by column position; confirm the label with your trainer.\n\nThreshold Run Week 1\n\nWarm up 15 min. RPE 1-3\n4 x 20 sec. strides RPE 9-10\n\n3 x 5 min. RPE 8\n\nCool Down 5 min. RPE 1-2",
        "exercises": [
          {
            "id": "coach-w3-mon-warmup",
            "name": "Warm-up",
            "sets": 1,
            "reps": "15",
            "unit": "min",
            "note": "RPE 1–3"
          },
          {
            "id": "coach-w3-mon-strides",
            "name": "Strides",
            "sets": 4,
            "reps": "20",
            "unit": "sec",
            "note": "RPE 9–10. Recovery between strides is not specified in the workbook."
          },
          {
            "id": "coach-w3-mon-threshold",
            "name": "Threshold intervals",
            "sets": 3,
            "reps": "5",
            "unit": "min",
            "note": "RPE 8. Recovery between intervals is not specified in the workbook."
          },
          {
            "id": "coach-w3-mon-cooldown",
            "name": "Cool down",
            "sets": 1,
            "reps": "5",
            "unit": "min",
            "note": "RPE 1–2"
          }
        ],
        "source": "Runs + Cardio!E3"
      },
      {
        "id": "coach-w3-tue",
        "weekday": "TUE",
        "name": "Full body strength · Lower emphasis",
        "type": "Strength · paired A–D exercises",
        "minutes": null,
        "note": "Notes: The big goal with these workouts is to push your muscles past the breaking point through reps, not weight. You should feel like the first \n4-6 reps are really easy, and then hate the exercise and barely be able to finish by the final reps. SO GO HEAVY, but be able to hit the rep scheme. \nIf you fail, drop a little bit and keep going. Finish the reps no matter what. We are focusing on Muscular Endurance & building that Threshold.",
        "exercises": [
          {
            "id": "coach-w3-B-warmup",
            "name": "Warm up as needed",
            "sets": 1,
            "reps": "As needed",
            "unit": "as prescribed",
            "note": ""
          },
          {
            "id": "coach-w3-B7",
            "name": "A1: Barbell Back Squat",
            "sets": 3,
            "reps": "12",
            "unit": "reps",
            "note": "Maintain reps go lighter if needed\nSTAY FUCKING LOW"
          },
          {
            "id": "coach-w3-B8",
            "name": "A2: Mini Band Monster Walk",
            "sets": 3,
            "reps": "30s both ways",
            "unit": "as prescribed",
            "note": ""
          },
          {
            "id": "coach-w3-B9",
            "name": "B1: Hip Thrust",
            "sets": 3,
            "reps": "10+10+10",
            "unit": "reps",
            "note": "10 full reps - 10s hold at top - 10 pulse\nMaintain reps go lighter if needed"
          },
          {
            "id": "coach-w3-B10",
            "name": "B2: Barbell Row",
            "sets": 3,
            "reps": "12",
            "unit": "reps",
            "note": ""
          },
          {
            "id": "coach-w3-B11",
            "name": "C1: DB Thrusters",
            "sets": 3,
            "reps": "15",
            "unit": "reps",
            "note": "goodluck\ngo heavy and embrace the shake"
          },
          {
            "id": "coach-w3-B12",
            "name": "C2: DB Split Squat ISO hold",
            "sets": 3,
            "reps": "30s ea.",
            "unit": "as prescribed",
            "note": ""
          },
          {
            "id": "coach-w3-B13",
            "name": "D1: Machine Chest Press",
            "sets": 3,
            "reps": "8+10+12",
            "unit": "reps",
            "note": "Drive good form -- no compensation\nfull stretch on the lats"
          },
          {
            "id": "coach-w3-B14",
            "name": "D2: Machine SA Chest Supported Row",
            "sets": 3,
            "reps": "10+10",
            "unit": "reps",
            "note": ""
          }
        ],
        "source": "Full Body Strength Days!B3:H15"
      },
      {
        "id": "coach-w3-wed-bike",
        "weekday": "WED",
        "slot": "zone2",
        "mode": "bike",
        "sport": "bike",
        "name": "Zone 2 bike + core",
        "type": "Zone 2 cardio + core",
        "minutes": null,
        "cardioMinutes": 60,
        "note": "Wednesday Zone 2 slot replaces the run with a trainer-listed alternative. Select one option, not an additional workout. Core work stays in this session.\nAlternate Zone 2 Cardio Options:\n- 3 Rounds (10min. Assault Bike @ RPE 4-5 + 5min. Row Erg @ RPE 5)\n- 60 min. Bike (RPM 75+ HR-Z2)\n- 45 min. Swim (easy)",
        "exercises": [
          {
            "id": "coach-w3-wed-bike-bike",
            "name": "Zone 2 bike",
            "sets": 1,
            "reps": "60",
            "unit": "min",
            "note": "RPM 75+ · HR–Z2. From the trainer’s alternate cardio options."
          },
          {
            "id": "coach-w3-wed-bike-core-13",
            "name": "A1: Hang Leg Raises",
            "sets": 4,
            "reps": "TIll Failure",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w3-wed-bike-core-14",
            "name": "A2: Weighted Ab Roll Out",
            "sets": 4,
            "reps": "15",
            "unit": "reps",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w3-wed-bike-core-15",
            "name": "A3: Stir the Pot on Med Ball",
            "sets": 4,
            "reps": "10 ea.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w3-wed-bike-core-16",
            "name": "A4: Low Plank Hold",
            "sets": 4,
            "reps": "45 sec.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          }
        ],
        "source": "Runs + Cardio!H19; L13:N16"
      },
      {
        "id": "coach-w3-thu",
        "weekday": "THU",
        "name": "Full body strength · Upper emphasis",
        "type": "Strength · paired A–D exercises",
        "minutes": null,
        "note": "Notes: Same thing as V1.\nNotes: The big goal with these workouts is to push your muscles past the breaking point through reps, not weight. You should feel like the first \n4-6 reps are really easy, and then hate the exercise and barely be able to finish by the final reps. SO GO HEAVY, but be able to hit the rep scheme. \nIf you fail, drop a little bit and keep going. Finish the reps no matter what. We are focusing on Muscular Endurance & building that Threshold.",
        "exercises": [
          {
            "id": "coach-w3-J-warmup",
            "name": "Warm up as needed",
            "sets": 1,
            "reps": "As needed",
            "unit": "as prescribed",
            "note": ""
          },
          {
            "id": "coach-w3-J7",
            "name": "A1: Barbell Bench Press",
            "sets": 3,
            "reps": "12+12+TF",
            "unit": "reps",
            "note": "2x drop set w/ DB's --> PU's TF\nHEAVY for 6 into AMRAP BW"
          },
          {
            "id": "coach-w3-J8",
            "name": "A2: Australian Pull ups",
            "sets": 3,
            "reps": "6+TF",
            "unit": "reps",
            "note": ""
          },
          {
            "id": "coach-w3-J9",
            "name": "B1: BB Walking Lunges",
            "sets": 3,
            "reps": "50m",
            "unit": "as prescribed",
            "note": "Keep core tight + keep elbows high\nLegs should be shaking"
          },
          {
            "id": "coach-w3-J10",
            "name": "B2: DB RDL's",
            "sets": 3,
            "reps": "12+12",
            "unit": "reps",
            "note": ""
          },
          {
            "id": "coach-w3-J11",
            "name": "C1: SA KB Clean to Push Press",
            "sets": 3,
            "reps": "12 each side",
            "unit": "as prescribed",
            "note": "Quarter Squat for the push press\nAll one arm then the other"
          },
          {
            "id": "coach-w3-J12",
            "name": "C2: KB Gorilla Row",
            "sets": 3,
            "reps": "15ea.",
            "unit": "as prescribed",
            "note": ""
          },
          {
            "id": "coach-w3-J13",
            "name": "D1: Suitcase Carry",
            "sets": 3,
            "reps": "70m",
            "unit": "as prescribed",
            "note": "Shoulders back\nChest Up"
          },
          {
            "id": "coach-w3-J14",
            "name": "D2: DB Reverse Fly's",
            "sets": 3,
            "reps": "12ea.",
            "unit": "as prescribed",
            "note": ""
          }
        ],
        "source": "Full Body Strength Days!J3:P15"
      },
      {
        "id": "coach-w3-fri",
        "weekday": "FRI",
        "name": "Speed run",
        "type": "Running · intervals",
        "sport": "run",
        "minutes": null,
        "note": "Speed Run Week 3\n\nWarm-up 10 min. RPE 1-2\n4 x 20 sec. strides RPE 9-10\n\nAS FAST AS POSSIBLE:\n1 x 1000m\n2min. rest\n4 x 200m w/ 1 min. rest\n2min. rest\n4 x 100m w/ 1 min. rest\n2 min. rest\n1 x 800m\n\nCool Down 5 min. RPE 1-2",
        "exercises": [
          {
            "id": "coach-w3-fri-warmup",
            "name": "Warm-up",
            "sets": 1,
            "reps": "10",
            "unit": "min",
            "note": "RPE 1–2"
          },
          {
            "id": "coach-w3-fri-strides",
            "name": "Strides",
            "sets": 4,
            "reps": "20",
            "unit": "sec",
            "note": "RPE 9–10. Recovery between strides is not specified in the workbook."
          },
          {
            "id": "coach-w3-fri-intervals-0",
            "name": "Interval group 1",
            "sets": 1,
            "reps": "1000",
            "unit": "m",
            "note": "AS FAST AS POSSIBLE. 2 min rest after this group."
          },
          {
            "id": "coach-w3-fri-intervals-1",
            "name": "Interval group 2",
            "sets": 4,
            "reps": "200",
            "unit": "m",
            "note": "AS FAST AS POSSIBLE. 1 min rest between repeats. 2 min rest after this group."
          },
          {
            "id": "coach-w3-fri-intervals-2",
            "name": "Interval group 3",
            "sets": 4,
            "reps": "100",
            "unit": "m",
            "note": "AS FAST AS POSSIBLE. 1 min rest between repeats. 2 min rest after this group."
          },
          {
            "id": "coach-w3-fri-intervals-3",
            "name": "Interval group 4",
            "sets": 1,
            "reps": "800",
            "unit": "m",
            "note": "AS FAST AS POSSIBLE."
          },
          {
            "id": "coach-w3-fri-cooldown",
            "name": "Cool down",
            "sets": 1,
            "reps": "5",
            "unit": "min",
            "note": "RPE 1–2"
          }
        ],
        "source": "Runs + Cardio!E18"
      },
      {
        "id": "coach-w3-sat",
        "weekday": "SAT",
        "name": "HYROX · 7 rounds · E7MOM",
        "type": "HYROX circuit",
        "sport": "hyrox",
        "minutes": null,
        "note": "HYROX CIRCUIT WEEK 3\n\n7 Rounds - E7MOM\n\n- 500m RowErg\n- 15 Pushups \n- 20 Wall Balls\n\nCash Out: 1-mile run + 100 BW Squats",
        "exercises": [
          {
            "id": "coach-w3-sat-row",
            "name": "RowErg",
            "sets": 7,
            "reps": "500",
            "unit": "m",
            "note": "E7MOM: repeat the circuit every 7 minutes for 7 rounds."
          },
          {
            "id": "coach-w3-sat-pushup",
            "name": "Pushups",
            "sets": 7,
            "reps": "15",
            "unit": "reps",
            "note": ""
          },
          {
            "id": "coach-w3-sat-wall",
            "name": "Wall balls",
            "sets": 7,
            "reps": "20",
            "unit": "reps",
            "note": "Ball weight is not specified."
          },
          {
            "id": "coach-w3-sat-cashrun",
            "name": "Cash-out run",
            "sets": 1,
            "reps": "1",
            "unit": "miles",
            "note": "Complete after the 7 rounds."
          },
          {
            "id": "coach-w3-sat-cashsquat",
            "name": "Cash-out bodyweight squats",
            "sets": 1,
            "reps": "100",
            "unit": "reps",
            "note": ""
          }
        ],
        "source": "HYROX Circuits!J4"
      },
      {
        "id": "coach-w3-sun",
        "weekday": "SUN",
        "name": "Rest / active recovery",
        "type": "Recovery",
        "minutes": 0,
        "note": "Sunday: rest or active recovery, as listed in the trainer’s split.",
        "exercises": [],
        "source": "Periodization!D19:D21"
      }
    ]
  },
  "cardioVariants": {
    "1": {
      "bike": {
        "id": "coach-w1-wed-bike",
        "weekday": "WED",
        "slot": "zone2",
        "mode": "bike",
        "sport": "bike",
        "name": "Zone 2 bike + core",
        "type": "Zone 2 cardio + core",
        "minutes": null,
        "cardioMinutes": 60,
        "note": "Wednesday Zone 2 slot replaces the run with a trainer-listed alternative. Select one option, not an additional workout. Core work stays in this session.\nAlternate Zone 2 Cardio Options:\n- 3 Rounds (10min. Assault Bike @ RPE 4-5 + 5min. Row Erg @ RPE 5)\n- 60 min. Bike (RPM 75+ HR-Z2)\n- 45 min. Swim (easy)",
        "exercises": [
          {
            "id": "coach-w1-wed-bike-bike",
            "name": "Zone 2 bike",
            "sets": 1,
            "reps": "60",
            "unit": "min",
            "note": "RPM 75+ · HR–Z2. From the trainer’s alternate cardio options."
          },
          {
            "id": "coach-w1-wed-bike-core-3",
            "name": "A1: Hang Leg Raises",
            "sets": 4,
            "reps": "TIll Failure",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w1-wed-bike-core-4",
            "name": "A2: Weighted Ab Roll Out",
            "sets": 4,
            "reps": "15",
            "unit": "reps",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w1-wed-bike-core-5",
            "name": "A3: Stir the Pot on Med Ball",
            "sets": 4,
            "reps": "10 ea.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w1-wed-bike-core-6",
            "name": "A4: Low Plank Hold",
            "sets": 4,
            "reps": "45 sec.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          }
        ],
        "source": "Runs + Cardio!H19; L3:N6"
      },
      "swim": {
        "id": "coach-w1-wed-swim",
        "weekday": "WED",
        "slot": "zone2",
        "mode": "swim",
        "sport": "swim",
        "name": "Easy swim + core",
        "type": "Zone 2 cardio + core",
        "minutes": null,
        "cardioMinutes": 45,
        "note": "Wednesday Zone 2 slot replaces the run with a trainer-listed alternative. Select one option, not an additional workout. Core work stays in this session.\nAlternate Zone 2 Cardio Options:\n- 3 Rounds (10min. Assault Bike @ RPE 4-5 + 5min. Row Erg @ RPE 5)\n- 60 min. Bike (RPM 75+ HR-Z2)\n- 45 min. Swim (easy)",
        "exercises": [
          {
            "id": "coach-w1-wed-swim-swim",
            "name": "Easy swim",
            "sets": 1,
            "reps": "45",
            "unit": "min",
            "note": "Easy effort. Distance, stroke, and interval structure are not specified in the workbook."
          },
          {
            "id": "coach-w1-wed-swim-core-3",
            "name": "A1: Hang Leg Raises",
            "sets": 4,
            "reps": "TIll Failure",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w1-wed-swim-core-4",
            "name": "A2: Weighted Ab Roll Out",
            "sets": 4,
            "reps": "15",
            "unit": "reps",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w1-wed-swim-core-5",
            "name": "A3: Stir the Pot on Med Ball",
            "sets": 4,
            "reps": "10 ea.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w1-wed-swim-core-6",
            "name": "A4: Low Plank Hold",
            "sets": 4,
            "reps": "45 sec.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          }
        ],
        "source": "Runs + Cardio!H19; L3:N6"
      },
      "run": {
        "id": "coach-w1-wed-run",
        "weekday": "WED",
        "slot": "zone2",
        "mode": "run",
        "sport": "run",
        "name": "Zone 2 run + core",
        "type": "Zone 2 cardio + core",
        "minutes": null,
        "cardioMinutes": 40,
        "note": "Wednesday Zone 2 slot replaces the run with a trainer-listed alternative. Select one option, not an additional workout. Core work stays in this session.\nAlternate Zone 2 Cardio Options:\n- 3 Rounds (10min. Assault Bike @ RPE 4-5 + 5min. Row Erg @ RPE 5)\n- 60 min. Bike (RPM 75+ HR-Z2)\n- 45 min. Swim (easy)",
        "exercises": [
          {
            "id": "coach-w1-wed-run-run",
            "name": "Zone 2 / long run",
            "sets": 1,
            "reps": "40",
            "unit": "min",
            "note": "LONG RUN WEEK 1:\n40 min. Run (Goal: 3.0 - 4.0 miles)"
          },
          {
            "id": "coach-w1-wed-run-core-3",
            "name": "A1: Hang Leg Raises",
            "sets": 4,
            "reps": "TIll Failure",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w1-wed-run-core-4",
            "name": "A2: Weighted Ab Roll Out",
            "sets": 4,
            "reps": "15",
            "unit": "reps",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w1-wed-run-core-5",
            "name": "A3: Stir the Pot on Med Ball",
            "sets": 4,
            "reps": "10 ea.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w1-wed-run-core-6",
            "name": "A4: Low Plank Hold",
            "sets": 4,
            "reps": "45 sec.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          }
        ],
        "source": "Runs + Cardio!H19; L3:N6"
      },
      "erg": {
        "id": "coach-w1-wed-erg",
        "weekday": "WED",
        "slot": "zone2",
        "mode": "erg",
        "sport": "erg",
        "name": "Assault bike + row + core",
        "type": "Zone 2 cardio + core",
        "minutes": null,
        "cardioMinutes": 45,
        "note": "Wednesday Zone 2 slot replaces the run with a trainer-listed alternative. Select one option, not an additional workout. Core work stays in this session.\nAlternate Zone 2 Cardio Options:\n- 3 Rounds (10min. Assault Bike @ RPE 4-5 + 5min. Row Erg @ RPE 5)\n- 60 min. Bike (RPM 75+ HR-Z2)\n- 45 min. Swim (easy)",
        "exercises": [
          {
            "id": "coach-w1-wed-erg-assault",
            "name": "Assault bike",
            "sets": 3,
            "reps": "10",
            "unit": "min",
            "note": "RPE 4–5. Alternate 10 minutes on the bike with 5 minutes on the rower, for 3 rounds."
          },
          {
            "id": "coach-w1-wed-erg-row",
            "name": "Row Erg",
            "sets": 3,
            "reps": "5",
            "unit": "min",
            "note": "RPE 5. Follow each bike segment with this row segment."
          },
          {
            "id": "coach-w1-wed-erg-core-3",
            "name": "A1: Hang Leg Raises",
            "sets": 4,
            "reps": "TIll Failure",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w1-wed-erg-core-4",
            "name": "A2: Weighted Ab Roll Out",
            "sets": 4,
            "reps": "15",
            "unit": "reps",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w1-wed-erg-core-5",
            "name": "A3: Stir the Pot on Med Ball",
            "sets": 4,
            "reps": "10 ea.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w1-wed-erg-core-6",
            "name": "A4: Low Plank Hold",
            "sets": 4,
            "reps": "45 sec.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          }
        ],
        "source": "Runs + Cardio!H19; L3:N6"
      }
    },
    "2": {
      "bike": {
        "id": "coach-w2-wed-bike",
        "weekday": "WED",
        "slot": "zone2",
        "mode": "bike",
        "sport": "bike",
        "name": "Zone 2 bike + core",
        "type": "Zone 2 cardio + core",
        "minutes": null,
        "cardioMinutes": 60,
        "note": "Wednesday Zone 2 slot replaces the run with a trainer-listed alternative. Select one option, not an additional workout. Core work stays in this session.\nAlternate Zone 2 Cardio Options:\n- 3 Rounds (10min. Assault Bike @ RPE 4-5 + 5min. Row Erg @ RPE 5)\n- 60 min. Bike (RPM 75+ HR-Z2)\n- 45 min. Swim (easy)",
        "exercises": [
          {
            "id": "coach-w2-wed-bike-bike",
            "name": "Zone 2 bike",
            "sets": 1,
            "reps": "60",
            "unit": "min",
            "note": "RPM 75+ · HR–Z2. From the trainer’s alternate cardio options."
          },
          {
            "id": "coach-w2-wed-bike-core-8",
            "name": "A1: Hang Leg Raises",
            "sets": 4,
            "reps": "TIll Failure",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w2-wed-bike-core-9",
            "name": "A2: Weighted Ab Roll Out",
            "sets": 4,
            "reps": "15",
            "unit": "reps",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w2-wed-bike-core-10",
            "name": "A3: Stir the Pot on Med Ball",
            "sets": 4,
            "reps": "10 ea.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w2-wed-bike-core-11",
            "name": "A4: Low Plank Hold",
            "sets": 4,
            "reps": "45 sec.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          }
        ],
        "source": "Runs + Cardio!H19; L8:N11"
      },
      "swim": {
        "id": "coach-w2-wed-swim",
        "weekday": "WED",
        "slot": "zone2",
        "mode": "swim",
        "sport": "swim",
        "name": "Easy swim + core",
        "type": "Zone 2 cardio + core",
        "minutes": null,
        "cardioMinutes": 45,
        "note": "Wednesday Zone 2 slot replaces the run with a trainer-listed alternative. Select one option, not an additional workout. Core work stays in this session.\nAlternate Zone 2 Cardio Options:\n- 3 Rounds (10min. Assault Bike @ RPE 4-5 + 5min. Row Erg @ RPE 5)\n- 60 min. Bike (RPM 75+ HR-Z2)\n- 45 min. Swim (easy)",
        "exercises": [
          {
            "id": "coach-w2-wed-swim-swim",
            "name": "Easy swim",
            "sets": 1,
            "reps": "45",
            "unit": "min",
            "note": "Easy effort. Distance, stroke, and interval structure are not specified in the workbook."
          },
          {
            "id": "coach-w2-wed-swim-core-8",
            "name": "A1: Hang Leg Raises",
            "sets": 4,
            "reps": "TIll Failure",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w2-wed-swim-core-9",
            "name": "A2: Weighted Ab Roll Out",
            "sets": 4,
            "reps": "15",
            "unit": "reps",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w2-wed-swim-core-10",
            "name": "A3: Stir the Pot on Med Ball",
            "sets": 4,
            "reps": "10 ea.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w2-wed-swim-core-11",
            "name": "A4: Low Plank Hold",
            "sets": 4,
            "reps": "45 sec.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          }
        ],
        "source": "Runs + Cardio!H19; L8:N11"
      },
      "run": {
        "id": "coach-w2-wed-run",
        "weekday": "WED",
        "slot": "zone2",
        "mode": "run",
        "sport": "run",
        "name": "Zone 2 run + core",
        "type": "Zone 2 cardio + core",
        "minutes": null,
        "cardioMinutes": 40,
        "note": "Wednesday Zone 2 slot replaces the run with a trainer-listed alternative. Select one option, not an additional workout. Core work stays in this session.\nAlternate Zone 2 Cardio Options:\n- 3 Rounds (10min. Assault Bike @ RPE 4-5 + 5min. Row Erg @ RPE 5)\n- 60 min. Bike (RPM 75+ HR-Z2)\n- 45 min. Swim (easy)",
        "exercises": [
          {
            "id": "coach-w2-wed-run-run",
            "name": "Zone 2 / long run",
            "sets": 1,
            "reps": "40",
            "unit": "min",
            "note": "LONG RUN WEEK 2:\n40 min. Run (Goal: 3.0 - 4.0 miles)"
          },
          {
            "id": "coach-w2-wed-run-core-8",
            "name": "A1: Hang Leg Raises",
            "sets": 4,
            "reps": "TIll Failure",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w2-wed-run-core-9",
            "name": "A2: Weighted Ab Roll Out",
            "sets": 4,
            "reps": "15",
            "unit": "reps",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w2-wed-run-core-10",
            "name": "A3: Stir the Pot on Med Ball",
            "sets": 4,
            "reps": "10 ea.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w2-wed-run-core-11",
            "name": "A4: Low Plank Hold",
            "sets": 4,
            "reps": "45 sec.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          }
        ],
        "source": "Runs + Cardio!H19; L8:N11"
      },
      "erg": {
        "id": "coach-w2-wed-erg",
        "weekday": "WED",
        "slot": "zone2",
        "mode": "erg",
        "sport": "erg",
        "name": "Assault bike + row + core",
        "type": "Zone 2 cardio + core",
        "minutes": null,
        "cardioMinutes": 45,
        "note": "Wednesday Zone 2 slot replaces the run with a trainer-listed alternative. Select one option, not an additional workout. Core work stays in this session.\nAlternate Zone 2 Cardio Options:\n- 3 Rounds (10min. Assault Bike @ RPE 4-5 + 5min. Row Erg @ RPE 5)\n- 60 min. Bike (RPM 75+ HR-Z2)\n- 45 min. Swim (easy)",
        "exercises": [
          {
            "id": "coach-w2-wed-erg-assault",
            "name": "Assault bike",
            "sets": 3,
            "reps": "10",
            "unit": "min",
            "note": "RPE 4–5. Alternate 10 minutes on the bike with 5 minutes on the rower, for 3 rounds."
          },
          {
            "id": "coach-w2-wed-erg-row",
            "name": "Row Erg",
            "sets": 3,
            "reps": "5",
            "unit": "min",
            "note": "RPE 5. Follow each bike segment with this row segment."
          },
          {
            "id": "coach-w2-wed-erg-core-8",
            "name": "A1: Hang Leg Raises",
            "sets": 4,
            "reps": "TIll Failure",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w2-wed-erg-core-9",
            "name": "A2: Weighted Ab Roll Out",
            "sets": 4,
            "reps": "15",
            "unit": "reps",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w2-wed-erg-core-10",
            "name": "A3: Stir the Pot on Med Ball",
            "sets": 4,
            "reps": "10 ea.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w2-wed-erg-core-11",
            "name": "A4: Low Plank Hold",
            "sets": 4,
            "reps": "45 sec.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          }
        ],
        "source": "Runs + Cardio!H19; L8:N11"
      }
    },
    "3": {
      "bike": {
        "id": "coach-w3-wed-bike",
        "weekday": "WED",
        "slot": "zone2",
        "mode": "bike",
        "sport": "bike",
        "name": "Zone 2 bike + core",
        "type": "Zone 2 cardio + core",
        "minutes": null,
        "cardioMinutes": 60,
        "note": "Wednesday Zone 2 slot replaces the run with a trainer-listed alternative. Select one option, not an additional workout. Core work stays in this session.\nAlternate Zone 2 Cardio Options:\n- 3 Rounds (10min. Assault Bike @ RPE 4-5 + 5min. Row Erg @ RPE 5)\n- 60 min. Bike (RPM 75+ HR-Z2)\n- 45 min. Swim (easy)",
        "exercises": [
          {
            "id": "coach-w3-wed-bike-bike",
            "name": "Zone 2 bike",
            "sets": 1,
            "reps": "60",
            "unit": "min",
            "note": "RPM 75+ · HR–Z2. From the trainer’s alternate cardio options."
          },
          {
            "id": "coach-w3-wed-bike-core-13",
            "name": "A1: Hang Leg Raises",
            "sets": 4,
            "reps": "TIll Failure",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w3-wed-bike-core-14",
            "name": "A2: Weighted Ab Roll Out",
            "sets": 4,
            "reps": "15",
            "unit": "reps",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w3-wed-bike-core-15",
            "name": "A3: Stir the Pot on Med Ball",
            "sets": 4,
            "reps": "10 ea.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w3-wed-bike-core-16",
            "name": "A4: Low Plank Hold",
            "sets": 4,
            "reps": "45 sec.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          }
        ],
        "source": "Runs + Cardio!H19; L13:N16"
      },
      "swim": {
        "id": "coach-w3-wed-swim",
        "weekday": "WED",
        "slot": "zone2",
        "mode": "swim",
        "sport": "swim",
        "name": "Easy swim + core",
        "type": "Zone 2 cardio + core",
        "minutes": null,
        "cardioMinutes": 45,
        "note": "Wednesday Zone 2 slot replaces the run with a trainer-listed alternative. Select one option, not an additional workout. Core work stays in this session.\nAlternate Zone 2 Cardio Options:\n- 3 Rounds (10min. Assault Bike @ RPE 4-5 + 5min. Row Erg @ RPE 5)\n- 60 min. Bike (RPM 75+ HR-Z2)\n- 45 min. Swim (easy)",
        "exercises": [
          {
            "id": "coach-w3-wed-swim-swim",
            "name": "Easy swim",
            "sets": 1,
            "reps": "45",
            "unit": "min",
            "note": "Easy effort. Distance, stroke, and interval structure are not specified in the workbook."
          },
          {
            "id": "coach-w3-wed-swim-core-13",
            "name": "A1: Hang Leg Raises",
            "sets": 4,
            "reps": "TIll Failure",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w3-wed-swim-core-14",
            "name": "A2: Weighted Ab Roll Out",
            "sets": 4,
            "reps": "15",
            "unit": "reps",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w3-wed-swim-core-15",
            "name": "A3: Stir the Pot on Med Ball",
            "sets": 4,
            "reps": "10 ea.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w3-wed-swim-core-16",
            "name": "A4: Low Plank Hold",
            "sets": 4,
            "reps": "45 sec.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          }
        ],
        "source": "Runs + Cardio!H19; L13:N16"
      },
      "run": {
        "id": "coach-w3-wed-run",
        "weekday": "WED",
        "slot": "zone2",
        "mode": "run",
        "sport": "run",
        "name": "Zone 2 run + core",
        "type": "Zone 2 cardio + core",
        "minutes": null,
        "cardioMinutes": 45,
        "note": "Wednesday Zone 2 slot replaces the run with a trainer-listed alternative. Select one option, not an additional workout. Core work stays in this session.\nAlternate Zone 2 Cardio Options:\n- 3 Rounds (10min. Assault Bike @ RPE 4-5 + 5min. Row Erg @ RPE 5)\n- 60 min. Bike (RPM 75+ HR-Z2)\n- 45 min. Swim (easy)",
        "exercises": [
          {
            "id": "coach-w3-wed-run-run",
            "name": "Zone 2 / long run",
            "sets": 1,
            "reps": "45",
            "unit": "min",
            "note": "LONG RUN WEEK 3:\n45 min. Run (Goal: 3.5 - 4.0 miles)"
          },
          {
            "id": "coach-w3-wed-run-core-13",
            "name": "A1: Hang Leg Raises",
            "sets": 4,
            "reps": "TIll Failure",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w3-wed-run-core-14",
            "name": "A2: Weighted Ab Roll Out",
            "sets": 4,
            "reps": "15",
            "unit": "reps",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w3-wed-run-core-15",
            "name": "A3: Stir the Pot on Med Ball",
            "sets": 4,
            "reps": "10 ea.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w3-wed-run-core-16",
            "name": "A4: Low Plank Hold",
            "sets": 4,
            "reps": "45 sec.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          }
        ],
        "source": "Runs + Cardio!H19; L13:N16"
      },
      "erg": {
        "id": "coach-w3-wed-erg",
        "weekday": "WED",
        "slot": "zone2",
        "mode": "erg",
        "sport": "erg",
        "name": "Assault bike + row + core",
        "type": "Zone 2 cardio + core",
        "minutes": null,
        "cardioMinutes": 45,
        "note": "Wednesday Zone 2 slot replaces the run with a trainer-listed alternative. Select one option, not an additional workout. Core work stays in this session.\nAlternate Zone 2 Cardio Options:\n- 3 Rounds (10min. Assault Bike @ RPE 4-5 + 5min. Row Erg @ RPE 5)\n- 60 min. Bike (RPM 75+ HR-Z2)\n- 45 min. Swim (easy)",
        "exercises": [
          {
            "id": "coach-w3-wed-erg-assault",
            "name": "Assault bike",
            "sets": 3,
            "reps": "10",
            "unit": "min",
            "note": "RPE 4–5. Alternate 10 minutes on the bike with 5 minutes on the rower, for 3 rounds."
          },
          {
            "id": "coach-w3-wed-erg-row",
            "name": "Row Erg",
            "sets": 3,
            "reps": "5",
            "unit": "min",
            "note": "RPE 5. Follow each bike segment with this row segment."
          },
          {
            "id": "coach-w3-wed-erg-core-13",
            "name": "A1: Hang Leg Raises",
            "sets": 4,
            "reps": "TIll Failure",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w3-wed-erg-core-14",
            "name": "A2: Weighted Ab Roll Out",
            "sets": 4,
            "reps": "15",
            "unit": "reps",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w3-wed-erg-core-15",
            "name": "A3: Stir the Pot on Med Ball",
            "sets": 4,
            "reps": "10 ea.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          },
          {
            "id": "coach-w3-wed-erg-core-16",
            "name": "A4: Low Plank Hold",
            "sets": 4,
            "reps": "45 sec.",
            "unit": "as prescribed",
            "note": "Core / accessory circuit from the workbook."
          }
        ],
        "source": "Runs + Cardio!H19; L13:N16"
      }
    }
  },
  "days": [
    {
      "id": "coach-w1-mon",
      "weekday": "MON",
      "name": "Threshold run",
      "type": "Running · intervals",
      "sport": "run",
      "minutes": null,
      "note": "Threshold Run Week 1\n\nWarm up 10 min. RPE 1-3\n4 x 20 sec. strides RPE 9-10\n\n3 x 4 min. RPE 8\n\nCool Down 5 min. RPE 1-2",
      "exercises": [
        {
          "id": "coach-w1-mon-warmup",
          "name": "Warm-up",
          "sets": 1,
          "reps": "10",
          "unit": "min",
          "note": "RPE 1–3"
        },
        {
          "id": "coach-w1-mon-strides",
          "name": "Strides",
          "sets": 4,
          "reps": "20",
          "unit": "sec",
          "note": "RPE 9–10. Recovery between strides is not specified in the workbook."
        },
        {
          "id": "coach-w1-mon-threshold",
          "name": "Threshold intervals",
          "sets": 3,
          "reps": "4",
          "unit": "min",
          "note": "RPE 8. Recovery between intervals is not specified in the workbook."
        },
        {
          "id": "coach-w1-mon-cooldown",
          "name": "Cool down",
          "sets": 1,
          "reps": "5",
          "unit": "min",
          "note": "RPE 1–2"
        }
      ],
      "source": "Runs + Cardio!A3"
    },
    {
      "id": "coach-w1-tue",
      "weekday": "TUE",
      "name": "Full body strength · Lower emphasis",
      "type": "Strength · paired A–D exercises",
      "minutes": null,
      "note": "Notes: The big goal with these workouts is to push your muscles past the breaking point through reps, not weight. You should feel like the first \n4-6 reps are really easy, and then hate the exercise and barely be able to finish by the final reps. SO GO HEAVY, but be able to hit the rep scheme. \nIf you fail, drop a little bit and keep going. Finish the reps no matter what. We are focusing on Muscular Endurance & building that Threshold.",
      "exercises": [
        {
          "id": "coach-w1-B-warmup",
          "name": "Warm up as needed",
          "sets": 1,
          "reps": "As needed",
          "unit": "as prescribed",
          "note": ""
        },
        {
          "id": "coach-w1-B7",
          "name": "A1: Barbell Back Squat",
          "sets": 3,
          "reps": "12",
          "unit": "reps",
          "note": "Maintain reps go lighter if needed\nSTAY FUCKING LOW"
        },
        {
          "id": "coach-w1-B8",
          "name": "A2: Mini Band Monster Walk",
          "sets": 3,
          "reps": "30s both ways",
          "unit": "as prescribed",
          "note": ""
        },
        {
          "id": "coach-w1-B9",
          "name": "B1: Hip Thrust",
          "sets": 3,
          "reps": "10+10+10",
          "unit": "reps",
          "note": "10 full reps - 10s hold at top - 10 pulse\nMaintain reps go lighter if needed"
        },
        {
          "id": "coach-w1-B10",
          "name": "B2: Barbell Row",
          "sets": 3,
          "reps": "12",
          "unit": "reps",
          "note": ""
        },
        {
          "id": "coach-w1-B11",
          "name": "C1: DB Thrusters",
          "sets": 3,
          "reps": "15",
          "unit": "reps",
          "note": "goodluck\ngo heavy and embrace the shake"
        },
        {
          "id": "coach-w1-B12",
          "name": "C2: DB Split Squat ISO hold",
          "sets": 3,
          "reps": "30s ea.",
          "unit": "as prescribed",
          "note": ""
        },
        {
          "id": "coach-w1-B13",
          "name": "D1: Machine Chest Press",
          "sets": 3,
          "reps": "8+10+12",
          "unit": "reps",
          "note": "Drive good form -- no compensation\nfull stretch on the lats"
        },
        {
          "id": "coach-w1-B14",
          "name": "D2: Machine SA Chest Supported Row",
          "sets": 3,
          "reps": "10+10",
          "unit": "reps",
          "note": ""
        }
      ],
      "source": "Full Body Strength Days!B3:H15"
    },
    {
      "id": "coach-w1-wed-bike",
      "weekday": "WED",
      "slot": "zone2",
      "mode": "bike",
      "sport": "bike",
      "name": "Zone 2 bike + core",
      "type": "Zone 2 cardio + core",
      "minutes": null,
      "cardioMinutes": 60,
      "note": "Wednesday Zone 2 slot replaces the run with a trainer-listed alternative. Select one option, not an additional workout. Core work stays in this session.\nAlternate Zone 2 Cardio Options:\n- 3 Rounds (10min. Assault Bike @ RPE 4-5 + 5min. Row Erg @ RPE 5)\n- 60 min. Bike (RPM 75+ HR-Z2)\n- 45 min. Swim (easy)",
      "exercises": [
        {
          "id": "coach-w1-wed-bike-bike",
          "name": "Zone 2 bike",
          "sets": 1,
          "reps": "60",
          "unit": "min",
          "note": "RPM 75+ · HR–Z2. From the trainer’s alternate cardio options."
        },
        {
          "id": "coach-w1-wed-bike-core-3",
          "name": "A1: Hang Leg Raises",
          "sets": 4,
          "reps": "TIll Failure",
          "unit": "as prescribed",
          "note": "Core / accessory circuit from the workbook."
        },
        {
          "id": "coach-w1-wed-bike-core-4",
          "name": "A2: Weighted Ab Roll Out",
          "sets": 4,
          "reps": "15",
          "unit": "reps",
          "note": "Core / accessory circuit from the workbook."
        },
        {
          "id": "coach-w1-wed-bike-core-5",
          "name": "A3: Stir the Pot on Med Ball",
          "sets": 4,
          "reps": "10 ea.",
          "unit": "as prescribed",
          "note": "Core / accessory circuit from the workbook."
        },
        {
          "id": "coach-w1-wed-bike-core-6",
          "name": "A4: Low Plank Hold",
          "sets": 4,
          "reps": "45 sec.",
          "unit": "as prescribed",
          "note": "Core / accessory circuit from the workbook."
        }
      ],
      "source": "Runs + Cardio!H19; L3:N6"
    },
    {
      "id": "coach-w1-thu",
      "weekday": "THU",
      "name": "Full body strength · Upper emphasis",
      "type": "Strength · paired A–D exercises",
      "minutes": null,
      "note": "Notes: Same thing as V1.\nNotes: The big goal with these workouts is to push your muscles past the breaking point through reps, not weight. You should feel like the first \n4-6 reps are really easy, and then hate the exercise and barely be able to finish by the final reps. SO GO HEAVY, but be able to hit the rep scheme. \nIf you fail, drop a little bit and keep going. Finish the reps no matter what. We are focusing on Muscular Endurance & building that Threshold.",
      "exercises": [
        {
          "id": "coach-w1-J-warmup",
          "name": "Warm up as needed",
          "sets": 1,
          "reps": "As needed",
          "unit": "as prescribed",
          "note": ""
        },
        {
          "id": "coach-w1-J7",
          "name": "A1: Barbell Bench Press",
          "sets": 3,
          "reps": "12+12+TF",
          "unit": "reps",
          "note": "2x drop set w/ DB's --> PU's TF\nHEAVY for 6 into AMRAP BW"
        },
        {
          "id": "coach-w1-J8",
          "name": "A2: Australian Pull ups",
          "sets": 3,
          "reps": "6+TF",
          "unit": "reps",
          "note": ""
        },
        {
          "id": "coach-w1-J9",
          "name": "B1: BB Walking Lunges",
          "sets": 3,
          "reps": "50m",
          "unit": "as prescribed",
          "note": "Keep core tight + keep elbows high\nLegs should be shaking"
        },
        {
          "id": "coach-w1-J10",
          "name": "B2: DB RDL's",
          "sets": 3,
          "reps": "12+12",
          "unit": "reps",
          "note": ""
        },
        {
          "id": "coach-w1-J11",
          "name": "C1: SA KB Clean to Push Press",
          "sets": 3,
          "reps": "12 each side",
          "unit": "as prescribed",
          "note": "Quarter Squat for the push press\nAll one arm then the other"
        },
        {
          "id": "coach-w1-J12",
          "name": "C2: KB Gorilla Row",
          "sets": 3,
          "reps": "15ea.",
          "unit": "as prescribed",
          "note": ""
        },
        {
          "id": "coach-w1-J13",
          "name": "D1: Suitcase Carry",
          "sets": 3,
          "reps": "70m",
          "unit": "as prescribed",
          "note": "Shoulders back\nChest Up"
        },
        {
          "id": "coach-w1-J14",
          "name": "D2: DB Reverse Fly's",
          "sets": 3,
          "reps": "12ea.",
          "unit": "as prescribed",
          "note": ""
        }
      ],
      "source": "Full Body Strength Days!J3:P15"
    },
    {
      "id": "coach-w1-fri",
      "weekday": "FRI",
      "name": "Speed run",
      "type": "Running · intervals",
      "sport": "run",
      "minutes": null,
      "note": "Speed Run Week 1\n\nWarm-up 10 min. RPE 1-2\n4 x 20 sec. strides RPE 9-10\n\nAS FAST AS POSSIBLE:\n2 x 400m w/ 1 min. rest\n2min. rest\n4 x 200m w/ 1 min. rest\n2min. rest\n4 x 100m w/ 1 min. rest\n2 min. rest\n2 x 400m w/ 1 min. rest\n\nCool Down 5 min. RPE 1-2",
      "exercises": [
        {
          "id": "coach-w1-fri-warmup",
          "name": "Warm-up",
          "sets": 1,
          "reps": "10",
          "unit": "min",
          "note": "RPE 1–2"
        },
        {
          "id": "coach-w1-fri-strides",
          "name": "Strides",
          "sets": 4,
          "reps": "20",
          "unit": "sec",
          "note": "RPE 9–10. Recovery between strides is not specified in the workbook."
        },
        {
          "id": "coach-w1-fri-intervals-0",
          "name": "Interval group 1",
          "sets": 2,
          "reps": "400",
          "unit": "m",
          "note": "AS FAST AS POSSIBLE. 1 min rest between repeats. 2 min rest after this group."
        },
        {
          "id": "coach-w1-fri-intervals-1",
          "name": "Interval group 2",
          "sets": 4,
          "reps": "200",
          "unit": "m",
          "note": "AS FAST AS POSSIBLE. 1 min rest between repeats. 2 min rest after this group."
        },
        {
          "id": "coach-w1-fri-intervals-2",
          "name": "Interval group 3",
          "sets": 4,
          "reps": "100",
          "unit": "m",
          "note": "AS FAST AS POSSIBLE. 1 min rest between repeats. 2 min rest after this group."
        },
        {
          "id": "coach-w1-fri-intervals-3",
          "name": "Interval group 4",
          "sets": 2,
          "reps": "400",
          "unit": "m",
          "note": "AS FAST AS POSSIBLE. 1 min rest between repeats."
        },
        {
          "id": "coach-w1-fri-cooldown",
          "name": "Cool down",
          "sets": 1,
          "reps": "5",
          "unit": "min",
          "note": "RPE 1–2"
        }
      ],
      "source": "Runs + Cardio!A18"
    },
    {
      "id": "coach-w1-sat",
      "weekday": "SAT",
      "name": "HYROX · 4-round circuit",
      "type": "HYROX circuit",
      "sport": "hyrox",
      "minutes": null,
      "note": "HYROX CIRCUIT WEEK 1\n\nBuy-In: 1000m Run @ 80%\n\n4 Rounds:\n- 500m SkiErg or 20 Burpee to Plate\n- 10 Alt. DB Snatch ea. (25lbs.)\n- 40yd. DB Walking Lunges (15lbs.)\n- 10 2-squats-to-box-jump\n- KB Gorilla Rows\n",
      "exercises": [
        {
          "id": "coach-w1-sat-buyin",
          "name": "Buy-in run",
          "sets": 1,
          "reps": "1000",
          "unit": "m",
          "note": "80% effort. Complete before the circuit."
        },
        {
          "id": "coach-w1-sat-ski",
          "name": "SkiErg or burpee to plate",
          "sets": 4,
          "reps": "500m SkiErg OR 20 burpees",
          "unit": "as prescribed",
          "note": "One station per round."
        },
        {
          "id": "coach-w1-sat-snatch",
          "name": "Alternating DB snatch",
          "sets": 4,
          "reps": "10 each",
          "unit": "reps",
          "note": "25 lb prescribed."
        },
        {
          "id": "coach-w1-sat-lunge",
          "name": "DB walking lunges",
          "sets": 4,
          "reps": "40",
          "unit": "yd",
          "note": "15 lb prescribed."
        },
        {
          "id": "coach-w1-sat-jump",
          "name": "2-squats-to-box-jump",
          "sets": 4,
          "reps": "10",
          "unit": "reps",
          "note": ""
        },
        {
          "id": "coach-w1-sat-gorilla",
          "name": "KB gorilla rows",
          "sets": 4,
          "reps": "Not specified",
          "unit": "as prescribed",
          "note": "The workbook does not specify reps or weight. Confirm with your trainer."
        }
      ],
      "source": "HYROX Circuits!B4"
    },
    {
      "id": "coach-w1-sun",
      "weekday": "SUN",
      "name": "Rest / active recovery",
      "type": "Recovery",
      "minutes": 0,
      "note": "Sunday: rest or active recovery, as listed in the trainer’s split.",
      "exercises": [],
      "source": "Periodization!D19:D21"
    }
  ]
};
