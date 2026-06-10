// ═══════════════════════════════════════════════
//  ZEROWEIGHT — app.js  (classement par muscle)
// ═══════════════════════════════════════════════

const EXERCISES_DB = [

  // ── POITRINE ──
  { id:'pu',        name:'Pompes',                emoji:'💪', muscle:'Pecs',        tags:['Pectoraux','Triceps'],         gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Corps droit, descends jusqu\'au sol, pousse.' },
  { id:'puw',       name:'Pompes larges',          emoji:'🏋️', muscle:'Pecs',        tags:['Pectoraux ext.','Épaules'],    gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Mains plus larges que les épaules, cible les pectoraux.' },
  { id:'pud',       name:'Pompes diamant',         emoji:'💎', muscle:'Pecs',        tags:['Triceps','Pectoraux'],         gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Mains formant un diamant sous la poitrine.' },
  { id:'pue',       name:'Pompes explosives',      emoji:'💥', muscle:'Pecs',        tags:['Pectoraux','Explosivité'],     gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Pousse fort pour décoller les mains du sol.' },
  { id:'puarch',    name:'Pompes Archer',          emoji:'🏹', muscle:'Pecs',        tags:['Pectoraux','Unilatéral'],      gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Étire un bras sur le côté à chaque rep.' },
  { id:'pu1arm',    name:'Pompe à 1 bras',         emoji:'🦾', muscle:'Pecs',        tags:['Pectoraux','Avancé'],          gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Le Saint Graal des pompes. Gainage total.' },
  { id:'decline',   name:'Pompes déclinées',       emoji:'⬆️', muscle:'Pecs',        tags:['Pecs haute','Épaules'],    gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Pieds surélevés, cible la poitrine haute.' },
  { id:'incline',   name:'Pompes inclinées',       emoji:'⬇️', muscle:'Pecs',        tags:['Pecs basse','Débutant'],   gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Mains surélevées, plus facile, poitrine basse.' },
  { id:'pseudo',    name:'Pseudo Planche Push-up', emoji:'🧘', muscle:'Pecs',        tags:['Pectoraux','Avancé'],          gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Mains pointées vers les pieds, corps très incliné.' },

  // ── ÉPAULES ──
  { id:'pike',      name:'Pike Push-up',           emoji:'🔺', muscle:'Épaules',         tags:['Deltoïdes','Triceps'],         gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Hanches hautes en V, fléchis les coudes.' },
  { id:'hs',        name:'Handstand Push-up',      emoji:'🤸', muscle:'Épaules',         tags:['Deltoïdes','Avancé'],          gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Contre le mur, descends la tête vers le sol.' },
  { id:'facepull',  name:'Face Pull élastique',    emoji:'🎯', muscle:'Épaules',         tags:['Coiffe rotateurs','Deltoïdes'],gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Élastique fixé haut, tire vers le visage.' },
  { id:'latsraise', name:'Lateral Raise sol',      emoji:'↔️', muscle:'Épaules',         tags:['Deltoïdes lat.'],              gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Allongé de côté, lève le bras tendu vers le plafond.' },

  // ── TRICEPS ──
  { id:'dip',       name:'Dips (chaise)',          emoji:'🪑', muscle:'Triceps',         tags:['Triceps','Épaules'],           gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Mains sur une chaise, descends les fesses.' },
  { id:'dipdip',    name:'Dips étroits',           emoji:'🔧', muscle:'Triceps',         tags:['Triceps','Isolé'],             gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Coudes collés au corps, descends lentement.' },
  { id:'skullcr',   name:'Skull Crushers sol',     emoji:'💀', muscle:'Triceps',         tags:['Triceps','Isolé'],             gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Allongé, plie les coudes vers le front et reviens.' },

  // ── DOS ──
  { id:'row',       name:'Tractions pronation',    emoji:'💪', muscle:'Dos',             tags:['Grand dorsal','Biceps'],       gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Prise en pronation, largeur d\'épaules.' },
  { id:'chinup',    name:'Chin-ups',               emoji:'💪', muscle:'Dos',             tags:['Grand dorsal','Biceps'],       gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Prise en supination, isole les biceps.' },
  { id:'widepull',  name:'Tractions larges',       emoji:'💪', muscle:'Dos',             tags:['Grand dorsal','V-taper'],      gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Prise large, maximise le dos en V.' },
  { id:'neutr',     name:'Tractions neutres',      emoji:'🤝', muscle:'Dos',             tags:['Grand dorsal','Biceps'],       gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Paumes face à face, prise naturelle.' },
  { id:'invrow',    name:'Rowing inversé',         emoji:'🔄', muscle:'Dos',             tags:['Rhomboïdes','Grand dorsal'],   gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Sous une table, corps planche, tire la poitrine.' },
  { id:'archrow',   name:'Rowing Archer',          emoji:'🏹', muscle:'Dos',             tags:['Grand dorsal','Unilatéral'],   gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Un bras tire, l\'autre s\'étend.' },
  { id:'muscleup',  name:'Muscle-up',              emoji:'🏆', muscle:'Dos',             tags:['Grand dorsal','Avancé'],       gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Traction + dip en un mouvement fluide.' },
  { id:'supext',    name:'Superman Extension',     emoji:'🦸', muscle:'Dos',             tags:['Érecteurs','Bas du dos'],      gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Allongé ventre au sol, lève bras et jambes ensemble.' },

  // ── BICEPS ──
  { id:'towelcurl', name:'Curl à la serviette',    emoji:'🧴', muscle:'Biceps',          tags:['Biceps','Avant-bras'],         gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Passe une serviette dans une porte, fléchis les coudes.' },
  { id:'curlrow',   name:'Curl en Rowing inversé', emoji:'💪', muscle:'Biceps',          tags:['Biceps','Avant-bras'],         gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Rowing inversé prise supination pour isoler les biceps.' },

  // ── QUADRICEPS ──
  { id:'sq',        name:'Squats',                 emoji:'🦵', muscle:'Quadriceps',      tags:['Quadriceps','Fessiers'],       gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Squat_side_ani.gif/200px-Squat_side_ani.gif', desc:'Pieds largeur d\'épaules, descends les hanches.' },
  { id:'pistol',    name:'Pistol Squat',           emoji:'🔫', muscle:'Quadriceps',      tags:['Quadriceps','Avancé'],         gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Squat_side_ani.gif/200px-Squat_side_ani.gif', desc:'Squat unijambiste complet, jambe tendue devant.' },
  { id:'shrimp',    name:'Shrimp Squat',           emoji:'🦐', muscle:'Quadriceps',      tags:['Quadriceps','Avancé'],         gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Squat_side_ani.gif/200px-Squat_side_ani.gif', desc:'Squat arrière unijambiste, genou qui touche le sol.' },
  { id:'wallsit',   name:'Chaise murale',          emoji:'🧱', muscle:'Quadriceps',      tags:['Quadriceps','Isométrique'],    gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Squat_side_ani.gif/200px-Squat_side_ani.gif', desc:'Dos au mur, cuisses parallèles au sol. Tiens.' },
  { id:'stepup',    name:'Step-ups',               emoji:'🪜', muscle:'Quadriceps',      tags:['Quadriceps','Fessiers'],       gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Squat_side_ani.gif/200px-Squat_side_ani.gif', desc:'Monte sur une chaise ou marche, alterne les jambes.' },
  { id:'sqj',       name:'Squats sautés',          emoji:'⚡', muscle:'Quadriceps',      tags:['Quadriceps','Explosivité'],    gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Squat_side_ani.gif/200px-Squat_side_ani.gif', desc:'Descends en squat, explose vers le haut.' },

  // ── FESSIERS ──
  { id:'glute',     name:'Hip Thrust sol',         emoji:'🍑', muscle:'Fessiers',        tags:['Fessiers','Ischio'],           gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Squat_side_ani.gif/200px-Squat_side_ani.gif', desc:'Dos au sol, monte les hanches en contractant les fessiers.' },
  { id:'bsq',       name:'Bulgarian Split Squat',  emoji:'🎯', muscle:'Fessiers',        tags:['Fessiers','Quadriceps'],       gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Squat_side_ani.gif/200px-Squat_side_ani.gif', desc:'Pied arrière surélevé, descends le genou avant.' },
  { id:'lunge',     name:'Fentes avant',           emoji:'🚶', muscle:'Fessiers',        tags:['Fessiers','Quadriceps'],       gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Lunge.gif/200px-Lunge.gif',                   desc:'Enjambe en avant, genou arrière effleure le sol.' },
  { id:'lungerev',  name:'Fentes arrière',         emoji:'↩️', muscle:'Fessiers',        tags:['Fessiers','Équilibre'],        gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Lunge.gif/200px-Lunge.gif',                   desc:'Recule un pied, genou descend vers le sol.' },
  { id:'lungej',    name:'Fentes sautées',         emoji:'🦘', muscle:'Fessiers',        tags:['Fessiers','Cardio'],           gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Lunge.gif/200px-Lunge.gif',                   desc:'Alterne les jambes en sautant.' },
  { id:'donkey',    name:'Donkey Kicks',           emoji:'🐴', muscle:'Fessiers',        tags:['Fessiers','Isométrique'],      gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Squat_side_ani.gif/200px-Squat_side_ani.gif', desc:'À 4 pattes, lève le genou vers le plafond.' },
  { id:'clamshell', name:'Clamshell',              emoji:'🐚', muscle:'Fessiers',        tags:['Abducteurs','Fessiers'],       gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Squat_side_ani.gif/200px-Squat_side_ani.gif', desc:'Sur le côté, ouvre le genou comme une palourde.' },

  // ── ISCHIO-JAMBIERS ──
  { id:'nordham',   name:'Nordic Hamstring',       emoji:'🏔️', muscle:'Ischio-jambiers', tags:['Ischio','Avancé'],            gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Squat_side_ani.gif/200px-Squat_side_ani.gif', desc:'Pieds bloqués, penche-toi lentement en avant.' },
  { id:'goodmorn',  name:'Good Morning',           emoji:'🌅', muscle:'Ischio-jambiers', tags:['Ischio','Bas du dos'],         gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Squat_side_ani.gif/200px-Squat_side_ani.gif', desc:'Mains derrière la tête, penche le buste en avant.' },
  { id:'legcurl',   name:'Leg Curl sol',           emoji:'🦵', muscle:'Ischio-jambiers', tags:['Ischio','Mollets'],            gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Squat_side_ani.gif/200px-Squat_side_ani.gif', desc:'Allongé ventre, fléchis les genoux vers les fesses.' },

  // ── MOLLETS ──
  { id:'calf',      name:'Mollets debout',         emoji:'🦿', muscle:'Mollets',         tags:['Mollets','Soléaire'],          gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Squat_side_ani.gif/200px-Squat_side_ani.gif', desc:'Monte sur la pointe des pieds, descends lentement.' },
  { id:'calfseated',name:'Mollets assis',          emoji:'💺', muscle:'Mollets',         tags:['Soléaire'],                    gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Squat_side_ani.gif/200px-Squat_side_ani.gif', desc:'Assis, monte sur la pointe des pieds.' },
  { id:'calfhop',   name:'Sauts pointe des pieds', emoji:'🩰', muscle:'Mollets',         tags:['Mollets','Cardio'],            gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Squat_side_ani.gif/200px-Squat_side_ani.gif', desc:'Sauts rapides sur la pointe des pieds.' },

  // ── ABDOMINAUX ──
  { id:'crunch',    name:'Crunchs',                emoji:'✨', muscle:'Abdominaux',      tags:['Grand droit','Abdos'],         gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif', desc:'Soulève les épaules, contracte les abdos.' },
  { id:'lleg',      name:'Levé de jambes',         emoji:'📐', muscle:'Abdominaux',      tags:['Bas du ventre','Abdos'],       gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif', desc:'Allongé, lève les jambes tendues à 90°.' },
  { id:'vup',       name:'V-ups',                  emoji:'✌️', muscle:'Abdominaux',      tags:['Full Core','Abdos'],           gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif', desc:'Soulève jambes et buste en même temps.' },
  { id:'hollow',    name:'Hollow Body Hold',       emoji:'🍌', muscle:'Abdominaux',      tags:['Gainage','Abdos'],             gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif', desc:'Allongé, creuse le ventre, bras et jambes décollés.' },
  { id:'tuckup',    name:'Tuck Crunches',          emoji:'🤸', muscle:'Abdominaux',      tags:['Abdos','Débutant'],            gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif', desc:'Ramène genoux et coudes ensemble.' },
  { id:'dragon',    name:'Dragon Flag',            emoji:'🐉', muscle:'Abdominaux',      tags:['Abdos','Avancé'],              gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif', desc:'Corps rigide, descends lentement depuis l\'appui épaules.' },
  { id:'lsit',      name:'L-sit',                  emoji:'🪑', muscle:'Abdominaux',      tags:['Abdos','Avancé'],              gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif', desc:'Appui sur les mains, jambes tendues horizontales.' },
  { id:'abswheel',  name:'Roue abdominale',        emoji:'☸️', muscle:'Abdominaux',      tags:['Abdos','Avancé'],              gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif', desc:'Roule au sol, étire le corps au maximum.' },
  { id:'deadbug',   name:'Dead Bug',               emoji:'🐛', muscle:'Abdominaux',      tags:['Stabilité','Abdos'],           gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif', desc:'Allongé, étire bras et jambe opposés lentement.' },
  { id:'mntclimb',  name:'Mountain Climbers',      emoji:'🏔️', muscle:'Abdominaux',      tags:['Abdos','Cardio'],              gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Mountain-Climbers.gif/200px-Mountain-Climbers.gif', desc:'En planche, ramène les genoux vite vers la poitrine.' },

  // ── OBLIQUES ──
  { id:'russ',      name:'Russian Twist',          emoji:'🌀', muscle:'Obliques',        tags:['Obliques','Abdos'],            gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif', desc:'Assis à 45°, tourne le buste de gauche à droite.' },
  { id:'bicycle',   name:'Crunchs bicycle',        emoji:'🚴', muscle:'Obliques',        tags:['Obliques','Abdos'],            gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif', desc:'Pédale en touchant le coude au genou opposé.' },
  { id:'plankside', name:'Planche latérale',       emoji:'📐', muscle:'Obliques',        tags:['Obliques','Gainage'],          gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif', desc:'Sur le côté, corps aligné, 1 appui.' },
  { id:'windshield',name:'Windshield Wipers',      emoji:'🌬️', muscle:'Obliques',        tags:['Obliques','Avancé'],           gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif', desc:'Jambes à 90°, bascule de droite à gauche.' },
  { id:'sidebend',  name:'Side Bend sol',          emoji:'🌿', muscle:'Obliques',        tags:['Obliques','Latéraux'],         gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif', desc:'Allongé de côté, soulève le buste latéralement.' },

  // ── GAINAGE ──
  { id:'plank',     name:'Planche',                emoji:'🔥', muscle:'Gainage',         tags:['Full Core','Isométrique'],     gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif', desc:'Corps droit des talons à la tête. Tiens.' },
  { id:'plankup',   name:'Planche dips latéraux',  emoji:'🔥', muscle:'Gainage',         tags:['Obliques','Core'],             gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif', desc:'En planche, descends une hanche vers le sol, alterne.' },
  { id:'supext',    name:'Superman Extension',     emoji:'🦸', muscle:'Gainage',         tags:['Bas du dos','Érecteurs'],      gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif', desc:'Allongé ventre au sol, lève bras et jambes ensemble.' },
  { id:'birddog',   name:'Bird Dog',               emoji:'🐦', muscle:'Gainage',         tags:['Stabilité','Bas du dos'],      gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif', desc:'À 4 pattes, étire le bras droit + jambe gauche ensemble.' },

  // ── CARDIO ──
  { id:'burpee',    name:'Burpees',                emoji:'🌪️', muscle:'Cardio',          tags:['Full Body','Explosivité'],     gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Burpee_-_animated_-_2019-09-19.gif/220px-Burpee_-_animated_-_2019-09-19.gif', desc:'Sol → planche → pompe → saut. Le boss du cardio.' },
  { id:'jj',        name:'Jumping Jacks',          emoji:'⭐', muscle:'Cardio',          tags:['Échauffement','Full Body'],    gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Jumping-Jacks.gif/200px-Jumping-Jacks.gif',                                   desc:'Saute en écartant bras et jambes simultanément.' },
  { id:'highk',     name:'High Knees',             emoji:'🏃', muscle:'Cardio',          tags:['Cardio','Core'],               gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/High-Knees.gif/200px-High-Knees.gif',                                         desc:'Course sur place, genoux à hauteur des hanches.' },
  { id:'butkick',   name:'Butt Kicks',             emoji:'👟', muscle:'Cardio',          tags:['Cardio','Ischio'],             gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/High-Knees.gif/200px-High-Knees.gif',                                         desc:'Course sur place, talon touche les fesses.' },
  { id:'skater',    name:'Skater Jumps',           emoji:'⛸️', muscle:'Cardio',          tags:['Cardio','Équilibre'],          gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/High-Knees.gif/200px-High-Knees.gif',                                         desc:'Saute latéralement d\'une jambe à l\'autre.' },
  { id:'boxjump',   name:'Box Jumps',              emoji:'📦', muscle:'Cardio',          tags:['Cardio','Explosivité'],        gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Squat_side_ani.gif/200px-Squat_side_ani.gif',                               desc:'Saute sur une boîte ou une marche.' },
  { id:'bearcrawl', name:'Bear Crawl',             emoji:'🐻', muscle:'Cardio',          tags:['Full Body','Core'],            gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/High-Knees.gif/200px-High-Knees.gif',                                         desc:'À 4 pattes, genoux décollés, avance en diagonale.' },
  { id:'starhop',   name:'Star Jumps',             emoji:'🌟', muscle:'Cardio',          tags:['Full Body','Explosivité'],     gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Jumping-Jacks.gif/200px-Jumping-Jacks.gif',                                   desc:'Squat puis saute en étoile, bras et jambes écartés.' },
  { id:'sprint',    name:'Sprint sur place',       emoji:'💨', muscle:'Cardio',          tags:['Cardio','Intensité max'],      gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/High-Knees.gif/200px-High-Knees.gif',                                         desc:'Course sur place à 100% d\'intensité.' },

  // ── CALLISTHÉNIE — SKILLS ──
  { id:'frogstand',   name:'Frog Stand',             emoji:'🐸', muscle:'Gainage',         tags:['Équilibre','Débutant'],        gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif',         desc:'Mains au sol, genoux posés sur les coudes, équilibre statique.' },
  { id:'crowstand',   name:'Crow Stand',             emoji:'🦅', muscle:'Gainage',         tags:['Équilibre','Intermédiaire'],   gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif',         desc:'Équilibre sur les mains, genoux sur les bras tendus.' },
  { id:'tucplanche',  name:'Tuck Planche Hold',      emoji:'⚖️', muscle:'Gainage',         tags:['Isométrique','Avancé'],        gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif',         desc:'Hanches et genoux ramenés vers la poitrine, corps décollé du sol.' },
  { id:'planchelean', name:'Planche Lean',           emoji:'🏄', muscle:'Gainage',         tags:['Isométrique','Avancé'],        gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif',         desc:'En planche, incline les épaules devant les mains. Progression planche.' },
  { id:'hshold',      name:'Handstand Hold',         emoji:'🙃', muscle:'Épaules',         tags:['Équilibre','Avancé','Isométrique'], gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif',   desc:'Équilibre sur les mains, corps aligné. Commence contre le mur.' },
  { id:'wallwalk',    name:'Wall Walk',              emoji:'🧗', muscle:'Épaules',         tags:['Force','Intermédiaire'],       gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif',         desc:'En pompe, marche les pieds au mur jusqu\'au handstand.' },
  { id:'fronttuck',   name:'Front Lever Tuck',       emoji:'🎯', muscle:'Dos',             tags:['Isométrique','Avancé'],        gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',                          desc:'Suspendu à la barre, maintiens les genoux ramenés, corps horizontal.' },
  { id:'backlev',     name:'Back Lever',             emoji:'🔙', muscle:'Dos',             tags:['Isométrique','Avancé'],        gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',                          desc:'Suspendu, corps horizontal face vers le bas. Skill de gymnastique.' },
  { id:'skincat',     name:'Skin the Cat',           emoji:'🐱', muscle:'Dos',             tags:['Mobilité','Intermédiaire'],    gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',                          desc:'Barre ou anneaux : passe les jambes sous les bras en contrôlant.' },
  { id:'typewpull',   name:'Typewriter Pull-up',     emoji:'⌨️', muscle:'Dos',             tags:['Grand dorsal','Avancé'],       gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',                          desc:'En haut de la traction, déplace ton buste latéralement.' },
  { id:'archerpull',  name:'Archer Pull-up',         emoji:'🏹', muscle:'Dos',             tags:['Grand dorsal','Avancé'],       gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',                          desc:'Tire d\'un côté en gardant l\'autre bras tendu.' },
  { id:'commpull',    name:'Commando Pull-up',       emoji:'🪖', muscle:'Dos',             tags:['Grand dorsal','Intermédiaire'],gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',                          desc:'Prise neutre, alterne la tête à gauche puis à droite de la barre.' },
  { id:'negpull',     name:'Traction négative',      emoji:'⬇️', muscle:'Dos',             tags:['Grand dorsal','Débutant'],     gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',                          desc:'Monte à la barre puis descends très lentement (5-8 sec). Renforce la traction.' },
  { id:'humanflag',   name:'Human Flag',             emoji:'🚩', muscle:'Obliques',        tags:['Isométrique','Avancé'],        gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif',         desc:'Corps horizontal à la verticale d\'un poteau. Le summum de la force latérale.' },
  { id:'hangknee',    name:'Hanging Knee Raise',     emoji:'🦵', muscle:'Abdominaux',      tags:['Abdos','Intermédiaire'],       gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif',         desc:'Suspendu à la barre, ramène les genoux vers la poitrine.' },
  { id:'toesbar',     name:'Toes to Bar',            emoji:'🎪', muscle:'Abdominaux',      tags:['Full Core','Avancé'],          gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif',         desc:'Suspendu, monte les pieds tendus jusqu\'à la barre.' },
  { id:'ringpu',      name:'Ring Push-up',           emoji:'⭕', muscle:'Pecs',            tags:['Pectoraux','Instabilité'],     gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',                          desc:'Pompes sur anneaux. L\'instabilité recrute bien plus de muscles stabilisateurs.' },
  { id:'ringdip',     name:'Ring Dip',               emoji:'💍', muscle:'Triceps',         tags:['Triceps','Avancé'],            gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',                          desc:'Dips sur anneaux. Stabilise en tournant les paumes vers l\'extérieur en haut.' },
];

const MUSCLE_ORDER = [
  'Pecs','Épaules','Triceps','Dos','Biceps',
  'Quadriceps','Fessiers','Ischio-jambiers','Mollets',
  'Abdominaux','Obliques','Gainage','Cardio'
];

const MUSCLE_EMOJI = {
  'Pecs':'🫀','Épaules':'🔵','Triceps':'💪','Dos':'🏋️','Biceps':'💪',
  'Quadriceps':'🦵','Fessiers':'🍑','Ischio-jambiers':'🦵','Mollets':'🦿',
  'Abdominaux':'🔥','Obliques':'🌀','Gainage':'🧱','Cardio':'❤️'
};

const MUSCLE_FILTERS = [
  { label:'Tous',           value:'Tous' },
  { label:'🫀 Pecs',   value:'Pecs' },
  { label:'🔵 Épaules',    value:'Épaules' },
  { label:'💪 Triceps',    value:'Triceps' },
  { label:'🏋️ Dos',        value:'Dos' },
  { label:'💪 Biceps',     value:'Biceps' },
  { label:'🦵 Quadriceps', value:'Quadriceps' },
  { label:'🍑 Fessiers',   value:'Fessiers' },
  { label:'🦵 Ischio',     value:'Ischio-jambiers' },
  { label:'🦿 Mollets',    value:'Mollets' },
  { label:'🔥 Abdominaux', value:'Abdominaux' },
  { label:'🌀 Obliques',   value:'Obliques' },
  { label:'🧱 Gainage',    value:'Gainage' },
  { label:'❤️ Cardio',     value:'Cardio' },
];

// ══════════════════════════════════════════════════════
//  MUSCLE BODY MAP — silhouette anatomique style app
//  Inspiré du design rouge/rose sur corps gris-bleu
// ══════════════════════════════════════════════════════

// Couleurs
const C = {
  bg:     '#0e1420',   // fond carte
  body:   '#1d2e45',   // silhouette corps
  muscle: '#e05070',   // muscle actif (rose/rouge)
  muscle2:'#c03050',   // muscle très actif
  dim:    '#152236',   // muscle inactif
  line:   '#0a111c',   // contours
};

// ── SILHOUETTE DE BASE — vue de face (80x120) ──
// Chaque zone est un <path> ou <ellipse> qu'on peut activer
function bodyFront(active = {}) {
  const m  = (k) => active[k] ? C.muscle  : C.dim;
  const on = (k) => !!active[k];
  return `<svg viewBox="0 0 80 105" xmlns="http://www.w3.org/2000/svg">
  <rect width="80" height="120" fill="${C.bg}"/>

  <!-- BASE SILHOUETTE (gris-bleu, dessiné EN PREMIER) -->
  <!-- Torse -->
  <path d="M24 25 Q22 50 23 68 L57 68 Q58 50 56 25 Q48 21 40 21 Q32 21 24 25Z" fill="${C.body}" stroke="${C.line}" stroke-width=".7"/>
  <!-- Bras gauche -->
  <ellipse cx="14" cy="42" rx="6" ry="13" fill="${C.body}" stroke="${C.line}" stroke-width=".7"/>
  <ellipse cx="11" cy="62" rx="4.5" ry="10" fill="${C.body}" stroke="${C.line}" stroke-width=".6"/>
  <!-- Bras droit -->
  <ellipse cx="66" cy="42" rx="6" ry="13" fill="${C.body}" stroke="${C.line}" stroke-width=".7"/>
  <ellipse cx="69" cy="62" rx="4.5" ry="10" fill="${C.body}" stroke="${C.line}" stroke-width=".6"/>
  <!-- Cuisses -->
  <ellipse cx="32" cy="82" rx="8" ry="14" fill="${C.body}" stroke="${C.line}" stroke-width=".7"/>
  <ellipse cx="48" cy="82" rx="8" ry="14" fill="${C.body}" stroke="${C.line}" stroke-width=".7"/>
  <!-- Tibias -->
  <ellipse cx="30" cy="106" rx="5.5" ry="12" fill="${C.body}" stroke="${C.line}" stroke-width=".6"/>
  <ellipse cx="50" cy="106" rx="5.5" ry="12" fill="${C.body}" stroke="${C.line}" stroke-width=".6"/>
  <!-- Tête + cou -->
  <rect x="36" y="19" width="8" height="7" rx="2" fill="${C.body}" stroke="${C.line}" stroke-width=".6"/>
  <ellipse cx="40" cy="11" rx="9" ry="10" fill="${C.body}" stroke="${C.line}" stroke-width=".8"/>

  <!-- MUSCLES ACTIFS (dessinés PAR-DESSUS) -->
  <!-- Épaules (deltoïdes) -->
  <ellipse cx="19" cy="28" rx="8" ry="7" fill="${m('shoulders')}" stroke="${C.line}" stroke-width=".6" opacity="${on('shoulders')?1:.6}"/>
  <ellipse cx="61" cy="28" rx="8" ry="7" fill="${m('shoulders')}" stroke="${C.line}" stroke-width=".6" opacity="${on('shoulders')?1:.6}"/>
  <!-- Pecs -->
  <ellipse cx="31" cy="35" rx="9" ry="8" fill="${m('pecs')}" stroke="${C.line}" stroke-width=".6" opacity="${on('pecs')?1:.6}"/>
  <ellipse cx="49" cy="35" rx="9" ry="8" fill="${m('pecs')}" stroke="${C.line}" stroke-width=".6" opacity="${on('pecs')?1:.6}"/>
  <!-- Biceps (avant du bras) -->
  <ellipse cx="14" cy="40" rx="4.5" ry="8" fill="${m('biceps')}" stroke="${C.line}" stroke-width=".5" opacity="${on('biceps')?1:.6}"/>
  <ellipse cx="66" cy="40" rx="4.5" ry="8" fill="${m('biceps')}" stroke="${C.line}" stroke-width=".5" opacity="${on('biceps')?1:.6}"/>
  <!-- Triceps (visible de face sur le côté) -->
  <ellipse cx="11" cy="44" rx="3" ry="7" fill="${m('triceps')}" stroke="${C.line}" stroke-width=".5" opacity="${on('triceps')?1:.5}"/>
  <ellipse cx="69" cy="44" rx="3" ry="7" fill="${m('triceps')}" stroke="${C.line}" stroke-width=".5" opacity="${on('triceps')?1:.5}"/>
  <!-- Obliques -->
  <path d="M24 38 Q20 52 22 66 L27 66 Q25 52 28 38Z" fill="${m('obliques')}" stroke="${C.line}" stroke-width=".5" opacity="${on('obliques')?1:.6}"/>
  <path d="M56 38 Q60 52 58 66 L53 66 Q55 52 52 38Z" fill="${m('obliques')}" stroke="${C.line}" stroke-width=".5" opacity="${on('obliques')?1:.6}"/>
  <!-- Abdos (6-pack) -->
  <rect x="33" y="40" width="6" height="5" rx="1.5" fill="${m('abs')}" stroke="${C.line}" stroke-width=".4" opacity="${on('abs')?1:.6}"/>
  <rect x="41" y="40" width="6" height="5" rx="1.5" fill="${m('abs')}" stroke="${C.line}" stroke-width=".4" opacity="${on('abs')?1:.6}"/>
  <rect x="33" y="48" width="6" height="5" rx="1.5" fill="${m('abs')}" stroke="${C.line}" stroke-width=".4" opacity="${on('abs')?1:.6}"/>
  <rect x="41" y="48" width="6" height="5" rx="1.5" fill="${m('abs')}" stroke="${C.line}" stroke-width=".4" opacity="${on('abs')?1:.6}"/>
  <rect x="33" y="56" width="6" height="5" rx="1.5" fill="${m('abs')}" stroke="${C.line}" stroke-width=".4" opacity="${on('abs')?1:.6}"/>
  <rect x="41" y="56" width="6" height="5" rx="1.5" fill="${m('abs')}" stroke="${C.line}" stroke-width=".4" opacity="${on('abs')?1:.6}"/>
  <!-- Quadriceps (avant cuisse) -->
  <ellipse cx="32" cy="80" rx="7" ry="12" fill="${m('quads')}" stroke="${C.line}" stroke-width=".5" opacity="${on('quads')?1:.6}"/>
  <ellipse cx="48" cy="80" rx="7" ry="12" fill="${m('quads')}" stroke="${C.line}" stroke-width=".5" opacity="${on('quads')?1:.6}"/>
  <!-- Fessiers (léger de face) -->
  <ellipse cx="33" cy="70" rx="7" ry="5" fill="${m('glutes')}" stroke="${C.line}" stroke-width=".5" opacity="${on('glutes')?1:.5}"/>
  <ellipse cx="47" cy="70" rx="7" ry="5" fill="${m('glutes')}" stroke="${C.line}" stroke-width=".5" opacity="${on('glutes')?1:.5}"/>
  <!-- Mollets -->
  <ellipse cx="30" cy="108" rx="4" ry="8" fill="${m('calves')}" stroke="${C.line}" stroke-width=".5" opacity="${on('calves')?1:.6}"/>
  <ellipse cx="50" cy="108" rx="4" ry="8" fill="${m('calves')}" stroke="${C.line}" stroke-width=".5" opacity="${on('calves')?1:.6}"/>
</svg>`;
}

function bodyBack(active = {}) {
  const m  = (k) => active[k] ? C.muscle  : C.dim;
  const on = (k) => !!active[k];
  return `<svg viewBox="0 0 80 105" xmlns="http://www.w3.org/2000/svg">
  <rect width="80" height="120" fill="${C.bg}"/>

  <!-- BASE SILHOUETTE -->
  <path d="M24 25 Q22 50 23 68 L57 68 Q58 50 56 25 Q48 21 40 21 Q32 21 24 25Z" fill="${C.body}" stroke="${C.line}" stroke-width=".7"/>
  <ellipse cx="14" cy="42" rx="6" ry="13" fill="${C.body}" stroke="${C.line}" stroke-width=".7"/>
  <ellipse cx="11" cy="62" rx="4.5" ry="10" fill="${C.body}" stroke="${C.line}" stroke-width=".6"/>
  <ellipse cx="66" cy="42" rx="6" ry="13" fill="${C.body}" stroke="${C.line}" stroke-width=".7"/>
  <ellipse cx="69" cy="62" rx="4.5" ry="10" fill="${C.body}" stroke="${C.line}" stroke-width=".6"/>
  <ellipse cx="32" cy="82" rx="8" ry="14" fill="${C.body}" stroke="${C.line}" stroke-width=".7"/>
  <ellipse cx="48" cy="82" rx="8" ry="14" fill="${C.body}" stroke="${C.line}" stroke-width=".7"/>
  <ellipse cx="30" cy="106" rx="5.5" ry="12" fill="${C.body}" stroke="${C.line}" stroke-width=".6"/>
  <ellipse cx="50" cy="106" rx="5.5" ry="12" fill="${C.body}" stroke="${C.line}" stroke-width=".6"/>
  <rect x="36" y="19" width="8" height="7" rx="2" fill="${C.body}" stroke="${C.line}" stroke-width=".6"/>
  <ellipse cx="40" cy="11" rx="9" ry="10" fill="${C.body}" stroke="${C.line}" stroke-width=".8"/>

  <!-- MUSCLES ACTIFS PAR-DESSUS -->
  <!-- Épaules arrière -->
  <ellipse cx="19" cy="28" rx="8" ry="7" fill="${m('shoulders')}" stroke="${C.line}" stroke-width=".6" opacity="${on('shoulders')?1:.6}"/>
  <ellipse cx="61" cy="28" rx="8" ry="7" fill="${m('shoulders')}" stroke="${C.line}" stroke-width=".6" opacity="${on('shoulders')?1:.6}"/>
  <!-- Triceps (arrière bras) -->
  <ellipse cx="14" cy="44" rx="4.5" ry="9" fill="${m('triceps')}" stroke="${C.line}" stroke-width=".5" opacity="${on('triceps')?1:.6}"/>
  <ellipse cx="66" cy="44" rx="4.5" ry="9" fill="${m('triceps')}" stroke="${C.line}" stroke-width=".5" opacity="${on('triceps')?1:.6}"/>
  <!-- Trapèzes -->
  <path d="M32 22 Q40 18 48 22 Q45 30 40 30 Q35 30 32 22Z" fill="${m('traps')}" stroke="${C.line}" stroke-width=".5" opacity="${on('traps')?1:.6}"/>
  <!-- Grand dorsal (lats) -->
  <path d="M23 28 Q17 44 20 62 L27 62 Q25 46 28 30Z" fill="${m('lats')}" stroke="${C.line}" stroke-width=".5" opacity="${on('lats')?1:.6}"/>
  <path d="M57 28 Q63 44 60 62 L53 62 Q55 46 52 30Z" fill="${m('lats')}" stroke="${C.line}" stroke-width=".5" opacity="${on('lats')?1:.6}"/>
  <!-- Rhomboïdes / milieu du dos -->
  <path d="M29 30 Q40 27 51 30 Q49 44 40 46 Q31 44 29 30Z" fill="${m('lats')}" stroke="${C.line}" stroke-width=".5" opacity="${on('lats')?1:.6}"/>
  <!-- Bas du dos -->
  <rect x="33" y="54" width="14" height="13" rx="3" fill="${m('lowerback')}" stroke="${C.line}" stroke-width=".5" opacity="${on('lowerback')?1:.6}"/>
  <!-- Fessiers -->
  <ellipse cx="33" cy="74" rx="10" ry="9" fill="${m('glutes')}" stroke="${C.line}" stroke-width=".6" opacity="${on('glutes')?1:.6}"/>
  <ellipse cx="47" cy="74" rx="10" ry="9" fill="${m('glutes')}" stroke="${C.line}" stroke-width=".6" opacity="${on('glutes')?1:.6}"/>
  <!-- Ischio-jambiers -->
  <ellipse cx="32" cy="86" rx="7" ry="12" fill="${m('hamstrings')}" stroke="${C.line}" stroke-width=".5" opacity="${on('hamstrings')?1:.6}"/>
  <ellipse cx="48" cy="86" rx="7" ry="12" fill="${m('hamstrings')}" stroke="${C.line}" stroke-width=".5" opacity="${on('hamstrings')?1:.6}"/>
  <!-- Mollets -->
  <ellipse cx="30" cy="108" rx="4.5" ry="9" fill="${m('calves')}" stroke="${C.line}" stroke-width=".5" opacity="${on('calves')?1:.6}"/>
  <ellipse cx="50" cy="108" rx="4.5" ry="9" fill="${m('calves')}" stroke="${C.line}" stroke-width=".5" opacity="${on('calves')?1:.6}"/>
</svg>`;
}

// ── MUSCLE MAP par exercice ──
// Chaque exercice définit quels muscles sont actifs (front/back)
const MUSCLE_MAPS = {
  // PECS — pecs+shoulders vue face, triceps vue dos
  'pu':        { front: {pecs:1, shoulders:1}, back: {triceps:1} },
  'puw':       { front: {pecs:1, shoulders:1} },
  'pud':       { front: {pecs:1}, back: {triceps:1} },
  'pue':       { front: {pecs:1, shoulders:1}, back: {triceps:1} },
  'puarch':    { front: {pecs:1, shoulders:1} },
  'pu1arm':    { front: {pecs:1, abs:1}, back: {triceps:1} },
  'decline':   { front: {pecs:1, shoulders:1} },
  'incline':   { front: {pecs:1} },
  'pseudo':    { front: {pecs:1, shoulders:1, abs:1} },
  // ÉPAULES
  'pike':      { front: {shoulders:1}, back: {shoulders:1, triceps:1} },
  'hs':        { front: {shoulders:1}, back: {shoulders:1, triceps:1} },
  'facepull':  { back:  {shoulders:1, traps:1} },
  'latsraise': { front: {shoulders:1} },
  // TRICEPS
  'dip':       { back:  {triceps:1, shoulders:1} },
  'dipdip':    { back:  {triceps:1} },
  'skullcr':   { back:  {triceps:1} },
  // DOS
  'row':       { back:  {lats:1, traps:1} },
  'chinup':    { front: {biceps:1}, back: {lats:1} },
  'widepull':  { back:  {lats:1, traps:1} },
  'neutr':     { front: {biceps:1}, back: {lats:1} },
  'invrow':    { back:  {lats:1, traps:1} },
  'archrow':   { back:  {lats:1} },
  'muscleup':  { front: {biceps:1}, back: {lats:1, triceps:1} },
  'supext':    { back:  {lowerback:1, glutes:1} },
  // BICEPS
  'towelcurl': { front: {biceps:1} },
  'curlrow':   { front: {biceps:1}, back: {lats:1} },
  // QUADRICEPS
  'sq':        { front: {quads:1}, back: {glutes:1} },
  'pistol':    { front: {quads:1} },
  'shrimp':    { front: {quads:1} },
  'wallsit':   { front: {quads:1} },
  'stepup':    { front: {quads:1}, back: {glutes:1} },
  'sqj':       { front: {quads:1}, back: {glutes:1} },
  // FESSIERS
  'glute':     { back:  {glutes:1, hamstrings:1} },
  'bsq':       { front: {quads:1}, back: {glutes:1, hamstrings:1} },
  'lunge':     { front: {quads:1}, back: {glutes:1} },
  'lungerev':  { front: {quads:1}, back: {glutes:1} },
  'lungej':    { front: {quads:1}, back: {glutes:1} },
  'donkey':    { back:  {glutes:1} },
  'clamshell': { back:  {glutes:1} },
  // ISCHIO
  'nordham':   { back:  {hamstrings:1, glutes:1} },
  'goodmorn':  { back:  {hamstrings:1, lowerback:1} },
  'legcurl':   { back:  {hamstrings:1} },
  // MOLLETS
  'calf':      { back:  {calves:1} },
  'calfseated':{ back:  {calves:1} },
  'calfhop':   { back:  {calves:1} },
  // ABDOMINAUX
  'crunch':    { front: {abs:1} },
  'lleg':      { front: {abs:1} },
  'vup':       { front: {abs:1} },
  'hollow':    { front: {abs:1, obliques:1} },
  'tuckup':    { front: {abs:1} },
  'dragon':    { front: {abs:1} },
  'lsit':      { front: {abs:1, obliques:1} },
  'abswheel':  { front: {abs:1, obliques:1}, back: {lowerback:1} },
  'deadbug':   { front: {abs:1} },
  'mntclimb':  { front: {abs:1, obliques:1, shoulders:1} },
  // OBLIQUES
  'russ':      { front: {obliques:1, abs:1} },
  'bicycle':   { front: {obliques:1, abs:1} },
  'plankside': { front: {obliques:1}, back: {lats:1} },
  'windshield':{ front: {obliques:1, abs:1} },
  'sidebend':  { front: {obliques:1} },
  // GAINAGE
  'plank':     { front: {abs:1, shoulders:1}, back: {lowerback:1} },
  'plankup':   { front: {obliques:1, abs:1}, back: {lowerback:1} },
  'birddog':   { front: {abs:1}, back: {lowerback:1, glutes:1} },
  // CALLISTHÉNIE SKILLS
  'frogstand':  { front: {abs:1, shoulders:1} },
  'crowstand':  { front: {abs:1, shoulders:1}, back: {triceps:1} },
  'tucplanche': { front: {pecs:1, shoulders:1, abs:1}, back: {triceps:1} },
  'planchelean':{ front: {pecs:1, shoulders:1, abs:1} },
  'hshold':     { front: {shoulders:1}, back: {shoulders:1, triceps:1} },
  'wallwalk':   { front: {shoulders:1, abs:1}, back: {shoulders:1} },
  'fronttuck':  { back:  {lats:1, traps:1, lowerback:1} },
  'backlev':    { back:  {lats:1, shoulders:1} },
  'skincat':    { back:  {lats:1, shoulders:1} },
  'typewpull':  { back:  {lats:1, traps:1} },
  'archerpull': { front: {biceps:1}, back: {lats:1} },
  'commpull':   { front: {biceps:1}, back: {lats:1} },
  'negpull':    { back:  {lats:1, traps:1} },
  'humanflag':  { front: {obliques:1, abs:1}, back: {lats:1} },
  'hangknee':   { front: {abs:1} },
  'toesbar':    { front: {abs:1, obliques:1}, back: {lats:1} },
  'ringpu':     { front: {pecs:1, shoulders:1}, back: {triceps:1} },
  'ringdip':    { back:  {triceps:1, shoulders:1} },
  // CARDIO
  'burpee':    { front: {pecs:1, quads:1, abs:1}, back: {glutes:1} },
  'jj':        { front: {shoulders:1, quads:1} },
  'highk':     { front: {quads:1, abs:1} },
  'butkick':   { back:  {hamstrings:1, glutes:1} },
  'skater':    { front: {quads:1}, back: {glutes:1} },
  'boxjump':   { front: {quads:1}, back: {glutes:1, hamstrings:1} },
  'bearcrawl': { front: {shoulders:1, abs:1}, back: {lats:1} },
  'starhop':   { front: {quads:1, shoulders:1} },
  'sprint':    { front: {quads:1, abs:1}, back: {hamstrings:1, glutes:1} },
};

// Génère une image combinée front+back selon les muscles actifs
function bodyImg(exoId) {
  const map = MUSCLE_MAPS[exoId] || {};
  const hasFront = map.front && Object.keys(map.front).length > 0;
  const hasBack  = map.back  && Object.keys(map.back).length  > 0;

  if (hasFront && hasBack) {
    // Côte à côte : front gauche, back droite
    const f = bodyFront(map.front);
    const b = bodyBack(map.back);
    const combined = `<svg viewBox="0 0 160 105" xmlns="http://www.w3.org/2000/svg">
      <rect width="160" height="120" fill="${C.bg}"/>
      <g transform="translate(0,0)">${f.replace(/<svg[^>]*>|<\/svg>/g,'')}</g>
      <g transform="translate(80,0)">${b.replace(/<svg[^>]*>|<\/svg>/g,'')}</g>
    </svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(combined);
  } else if (hasBack) {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(bodyBack(map.back));
  } else {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(bodyFront(map.front || {}));
  }
}

// EXO_SVG et svg60 gardés pour compatibilité mais remplacés par bodyImg
function svg60(c){return`<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#0e1420"/>${c}</svg>`;}
const EXO_SVG = {};


function resolveExoImg(exo) {
  return bodyImg(exo.id);
}

// ══════════════════════════════════════════════
//  FIREBASE — données partagées entre tous
// ══════════════════════════════════════════════
// Remplace localStorage — tout est synchronisé en temps réel

import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js';
import { getFirestore, collection, doc, onSnapshot, setDoc, deleteDoc, query, orderBy, getDoc }
  from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js';
import { getFunctions, httpsCallable }
  from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-functions.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInAnonymously, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup }
  from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js';

const firebaseConfig = {
  apiKey:            "AIzaSyBdb3K3X-sysepTYeVUFXhoQrgwl7VWpIA",
  authDomain:        "zeroweigth.firebaseapp.com",
  projectId:         "zeroweigth",
  storageBucket:     "zeroweigth.firebasestorage.app",
  messagingSenderId: "830641664692",
  appId:             "1:830641664692:web:fc1eed3ad8da709f635de1"
};

const app       = initializeApp(firebaseConfig);
const db        = getFirestore(app);
const auth      = getAuth(app);
const functions = getFunctions(app, 'europe-west1');

// Collections Firestore
const workoutsCol = collection(db, 'workouts');
const historyCol  = collection(db, 'sessionHistory');

// ── STATE (chargé depuis Firestore) ──
let workouts         = [];
let sessionHistory   = [];
let currentWorkout      = null;
let sessionExercises    = [];
let sessionSeconds      = 0;
let activeTimerInterval = null;
let currentFilterMuscle = 'Tous';
let editingWorkoutId    = null;
let workoutExercises    = [];
let previewExoId        = null;
let historyViewDate     = (() => { const d = new Date(); d.setHours(0,0,0,0); return d; })();
let pinCurrent          = '';

// ── FIREBASE CRUD ──

async function saveWorkoutToDb(w) {
  const list = JSON.parse(localStorage.getItem('zw_workouts') || '[]');
  const idx  = list.findIndex(x => x.id === w.id);
  if (idx >= 0) list[idx] = w; else list.push(w);
  localStorage.setItem('zw_workouts', JSON.stringify(list));
  workouts = list;
  renderWorkouts();
  if (auth.currentUser) setDoc(doc(db, 'workouts', w.id), w).catch(() => {});
}

async function deleteWorkoutFromDb(id) {
  const list = JSON.parse(localStorage.getItem('zw_workouts') || '[]').filter(x => x.id !== id);
  localStorage.setItem('zw_workouts', JSON.stringify(list));
  workouts = list;
  renderWorkouts();
  if (auth.currentUser) deleteDoc(doc(db, 'workouts', id)).catch(() => {});
}

async function saveSessionToDb(session) {
  const list = JSON.parse(localStorage.getItem('zw_history') || '[]');
  list.unshift(session);
  localStorage.setItem('zw_history', JSON.stringify(list));
  sessionHistory = list;
  renderHistory();
  if (auth.currentUser) setDoc(doc(db, 'sessionHistory', session.id), session).catch(() => {});
}

function save() {}

function loadWorkouts() {
  workouts = JSON.parse(localStorage.getItem('zw_workouts') || '[]');
  if (workouts.length === 0) seedDefaultWorkouts();
  else renderWorkouts();
}

// Historique — listener géré dans onAuthStateChanged
let historyUnsub = null;

// ── SEED PROGRAMMES PAR DÉFAUT ──
async function seedDefaultWorkouts() {
  const defaults = [
    { id:'default1', name:'Full Body Débutant', days:3, duration:40, exercises:[
        { exoId:'pu',    sets:[{reps:10},{reps:10},{reps:8}] },
        { exoId:'sq',    sets:[{reps:15},{reps:15},{reps:12}] },
        { exoId:'plank', sets:[{reps:30},{reps:30},{reps:20}] },
        { exoId:'lunge', sets:[{reps:10},{reps:10}] },
    ]},
    { id:'default2', name:'Upper Body Burn', days:2, duration:35, exercises:[
        { exoId:'pu',   sets:[{reps:12},{reps:12},{reps:10}] },
        { exoId:'pud',  sets:[{reps:8},{reps:8}] },
        { exoId:'dip',  sets:[{reps:10},{reps:10}] },
        { exoId:'pike', sets:[{reps:8},{reps:8}] },
    ]},
  ];
  for (const w of defaults) await saveWorkoutToDb(w);
}
function getExo(id) { return EXERCISES_DB.find(e => e.id === id); }
function fmtTime(sec) { return `${Math.floor(sec/60)}:${(sec%60).toString().padStart(2,'0')}`; }

function estimateDuration(exercises) {
  if (!exercises.length) return null;
  let sec = 5 * 60; // 5 min échauffement
  exercises.forEach(we => {
    const ex = getExo(we.exoId);
    const isIso = ex && ex.tags.some(t => t === 'Isométrique');
    we.sets.forEach(s => {
      const reps = parseInt(s.reps) || 10;
      sec += isIso ? reps + 45 : reps * 3.5 + 60;
    });
  });
  return Math.ceil(sec / 60 / 5) * 5;
}

function estimateDays(exercises) {
  if (!exercises.length) return null;
  const totalSets = exercises.reduce((acc, we) => acc + we.sets.length, 0);
  const muscles = new Set(exercises.map(we => getExo(we.exoId)?.muscle).filter(Boolean));
  if (muscles.size >= 5 || totalSets > 24) return 3;
  if (muscles.size >= 3 || totalSets > 12) return 4;
  return 5;
}

function updateEstimates() {
  const durEl  = document.getElementById('estimate-duration');
  const daysEl = document.getElementById('estimate-days');
  if (!durEl || !daysEl) return;
  const dur  = estimateDuration(workoutExercises);
  const days = estimateDays(workoutExercises);
  if (dur) {
    durEl.textContent = `~${dur} min`;
    durEl.classList.remove('empty');
  } else {
    durEl.textContent = '—';
    durEl.classList.add('empty');
  }
  if (days) {
    daysEl.textContent = `${days}× / sem.`;
    daysEl.classList.remove('empty');
  } else {
    daysEl.textContent = '—';
    daysEl.classList.add('empty');
  }
}

// ── PROGRAMMES GUIDÉS ──
const GUIDED_PROGRAMS = [
  {
    id:'debutant-complet',
    name:'Débutant Complet',
    emoji:'🌱',
    tag:'Débutant',
    tagColor:'#3de8a0',
    level:'Débutant',
    duration:'6 semaines',
    freq:'3x / semaine',
    desc:'Le programme idéal pour partir de zéro. Full body progressif, zéro matériel, résultats visibles en 6 semaines.',
    preview:['Pompes inclinées','Squats','Planche','Fentes avant','Crunchs','Hip Thrust sol'],
  },
  {
    id:'zero-tractions',
    name:'30 jours — 1ère traction',
    emoji:'🏆',
    tag:'Force',
    tagColor:'#4db8ff',
    level:'Débutant → Intermédiaire',
    duration:'4 semaines',
    freq:'3x / semaine',
    desc:'Programme progressif pour réaliser ta première traction complète. De zéro à héros en 30 jours.',
    preview:['Rowing inversé','Chin-ups négatifs','Dead Hang','Tractions assistées','Tractions larges'],
  },
  {
    id:'cent-pompes',
    name:'De zéro à 100 pompes',
    emoji:'💪',
    tag:'Endurance',
    tagColor:'#ff9f43',
    level:'Intermédiaire',
    duration:'6 semaines',
    freq:'4x / semaine',
    desc:'Le défi ultime. Progression semaine par semaine jusqu\'à 100 pompes d\'affilée.',
    preview:['Pompes classiques','Pompes larges','Pompes diamant','Pompes explosives','Pompes Archer'],
  },
  {
    id:'abdos-8sem',
    name:'Abdos visibles — 8 semaines',
    emoji:'✨',
    tag:'Définition',
    tagColor:'#a29bfe',
    level:'Intermédiaire',
    duration:'8 semaines',
    freq:'5x / semaine',
    desc:'Programme complet abdos + cardio HIIT pour révéler ta sangle abdominale en 8 semaines.',
    preview:['Crunchs','Levé de jambes','Mountain Climbers','Planche','V-ups','Russian Twist'],
  },
  {
    id:'masse-bw',
    name:'Prise de masse poids de corps',
    emoji:'🔥',
    tag:'Masse',
    tagColor:'#ff4f6a',
    level:'Avancé',
    duration:'12 semaines',
    freq:'4x / semaine',
    desc:'Hypertrophie maximale sans matériel. Programme PPL adapté au poids de corps pour prendre du volume.',
    preview:['Pompes Archer','Pistol Squat','Dips étroits','Tractions larges','Muscle-up'],
  },
  {
    id:'hiit-maison',
    name:'HIIT Cardio Maison',
    emoji:'🌪️',
    tag:'Cardio',
    tagColor:'#ffd32a',
    level:'Tous niveaux',
    duration:'4 semaines',
    freq:'3x / semaine',
    price:'5.99€',
    desc:'Séances HIIT de 20 min pour brûler un maximum de calories sans bouger de chez toi.',
    preview:['Burpees','Jumping Jacks','High Knees','Squats sautés','Mountain Climbers','Fentes sautées'],
  },
  {
    id:'force-mobilite',
    name:'Force & Mobilité',
    emoji:'🧘',
    tag:'Équilibre',
    tagColor:'#00d2d3',
    level:'Intermédiaire',
    duration:'8 semaines',
    freq:'3x / semaine',
    desc:'Combine renforcement et mobilité pour un corps performant et sans douleur au quotidien.',
    preview:['Bird Dog','Hip Thrust sol','Planche latérale','Good Morning','Clamshell','Dead Bug'],
  },
  {
    id:'handstand',
    name:'Handstand Progressif',
    emoji:'🤸',
    tag:'Skill',
    tagColor:'#fd79a8',
    level:'Avancé',
    duration:'8 semaines',
    freq:'4x / semaine',
    desc:'Apprends le handstand étape par étape. Du mur au freestand, progression structurée et sécurisée.',
    preview:['Pike Push-up','Crow Stand','Hollow Body Hold','Handstand Push-up','Planche'],
  },
];

function renderGuidedPrograms() {
  const premium = isPremium();
  document.getElementById('guided-list').innerHTML = GUIDED_PROGRAMS.map(p => `
    <div class="guided-card${premium ? '' : ' guided-card--locked'}" onclick="openGuidedProgram('${p.id}')">
      <div class="guided-card-left">
        <div class="guided-card-emoji">${p.emoji}</div>
        <div class="guided-card-info">
          <div class="guided-card-name">${p.name}</div>
          <div class="guided-card-meta">
            <span class="guided-tag-pill" style="color:${p.tagColor};border-color:${p.tagColor}20;background:${p.tagColor}15">${p.tag}</span>
            <span class="guided-card-stat">${p.duration}</span>
            <span class="guided-card-stat">${p.freq}</span>
          </div>
        </div>
      </div>
      ${premium
        ? `<div class="guided-lock-icon guided-lock-icon--open"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0"/></svg></div>`
        : `<div class="guided-price-wrap">
             <div class="guided-price-lock"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>
             <div class="guided-price">${PREMIUM_PRICE}</div>
           </div>`
      }
    </div>
  `).join('');
}

const PREMIUM_PRICE   = '9.99€ / mois';
const PREMIUM_EMAILS  = ['prout@hotmail.fr', 'hirionne@gmail.com'];
let premiumStatus = false;
function isPremium() { return premiumStatus; }

async function loadPremiumStatus(user) {
  if (!user || user.isAnonymous) { premiumStatus = false; return; }
  // Admins hardcodés
  if (PREMIUM_EMAILS.includes((user.email || '').toLowerCase())) { premiumStatus = true; return; }
  // Lecture Firestore (mis à jour par le webhook Stripe)
  try {
    const userRef = doc(db, 'users', user.uid);
    const snap    = await getDoc(userRef);
    if (snap.exists()) {
      premiumStatus = !!(snap.data().isPremium);
    } else {
      // Première connexion : créer le document avec isPremium: false
      await setDoc(userRef, {
        email:     user.email || '',
        isPremium: false,
        createdAt: new Date().toISOString(),
      });
      premiumStatus = false;
    }
  } catch(e) {
    premiumStatus = false;
  }
}

async function startCheckout() {
  const user = auth.currentUser;
  if (!user) { openAuth('login'); return; }
  const btn = document.getElementById('btn-subscribe');
  if (btn) { btn.textContent = 'Chargement…'; btn.disabled = true; }
  try {
    const fn = httpsCallable(functions, 'createCheckoutSession');
    const { data } = await fn();
    window.location.href = data.url;
  } catch(e) {
    alert('Erreur : ' + e.message);
    if (btn) { btn.textContent = 'Devenir Premium — ' + PREMIUM_PRICE; btn.disabled = false; }
  }
}

async function openCustomerPortal() {
  const btn = document.getElementById('btn-portal');
  if (btn) { btn.textContent = 'Chargement…'; btn.disabled = true; }
  try {
    const fn = httpsCallable(functions, 'createPortalLink');
    const { data } = await fn();
    window.location.href = data.url;
  } catch(e) {
    alert('Erreur : ' + e.message);
    if (btn) { btn.textContent = 'Gérer mon abonnement'; btn.disabled = false; }
  }
}

// Retour depuis Stripe Checkout
(function handleStripeReturn() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('premium') === 'success') {
    history.replaceState({}, '', window.location.pathname);
    setTimeout(() => alert('Paiement réussi ! Bienvenue dans le Premium.'), 500);
  }
})();

let currentGuidedProgramId = null;

function openGuidedProgram(id) {
  const p = GUIDED_PROGRAMS.find(x => x.id === id);
  if(!p) return;
  currentGuidedProgramId = id;
  document.getElementById('guided-modal-emoji').textContent = p.emoji;
  document.getElementById('guided-modal-name').textContent = p.name;
  document.getElementById('guided-modal-tag').innerHTML = `<span class="guided-tag-pill" style="color:${p.tagColor};border-color:${p.tagColor}20;background:${p.tagColor}15">${p.tag}</span>`;
  document.getElementById('guided-modal-meta').innerHTML = `<span>${p.level}</span> · <span>${p.duration}</span> · <span>${p.freq}</span>`;
  document.getElementById('guided-modal-desc').textContent = p.desc;
  const premium = isPremium();
  document.getElementById('guided-modal-preview').innerHTML = p.preview.map(name => {
    const ex = EXERCISES_DB.find(e => e.name === name);
    if (!ex) return `<div class="guided-preview-item"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>${name}</div>`;
    if (premium) {
      const img = resolveExoImg(ex);
      return `<div class="guided-exo-card" onclick="openExoFromGuided('${ex.id}')">
        <div class="guided-exo-thumb">
          ${img ? `<img src="${img}" alt="${ex.name}">` : `<span>${ex.emoji}</span>`}
        </div>
        <div class="guided-exo-info">
          <div class="guided-exo-name">${ex.name}</div>
          <div class="guided-exo-muscle">${ex.muscle} · ${ex.tags.slice(0,2).join(', ')}</div>
          <div class="guided-exo-desc">${ex.desc}</div>
        </div>
        <svg style="flex-shrink:0;opacity:.4" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>
      </div>`;
    }
    return `<div class="guided-preview-item guided-preview-item--link" onclick="openExoFromGuided('${ex.id}')">
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
        ${name}
        <svg style="margin-left:auto;flex-shrink:0;opacity:.5" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>
      </div>`;
  }).join('');
  document.getElementById('guided-lock').style.display       = premium ? 'none' : 'flex';
  document.getElementById('guided-start-btn').style.display  = premium ? 'flex' : 'none';
  document.getElementById('btn-subscribe').style.display     = premium ? 'none' : 'flex';
  openModal('modal-guided');
}

function openExoFromGuided(exoId) {
  const ex = getExo(exoId); if (!ex) return;
  previewExoId = exoId;
  const ytId = YOUTUBE_MAP[exoId];
  const gif  = resolveExoImg(ex);

  document.getElementById('preview-title').textContent  = ex.name;
  document.getElementById('preview-desc').textContent   = ex.desc || '';
  document.getElementById('preview-muscle').textContent = ex.muscle;
  document.getElementById('preview-tags').innerHTML     = ex.tags.map(t=>`<span class="exo-tag">${t}</span>`).join('');

  const mediaWrap = document.getElementById('preview-media-wrap');
  if (ytId) {
    mediaWrap.style.display = 'block';
    mediaWrap.innerHTML = `<div class="preview-video-wrap"><iframe src="https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=1&rel=0&modestbranding=1" allow="autoplay; encrypted-media" allowfullscreen frameborder="0" class="preview-iframe"></iframe></div>`;
  } else if (gif) {
    mediaWrap.style.display = 'block';
    mediaWrap.innerHTML = `<div class="preview-gif-wrap"><img src="${gif}" class="preview-gif-img" alt="${ex.name}"></div>`;
  } else {
    mediaWrap.style.display = 'none';
    mediaWrap.innerHTML = '';
  }

  const backBtn = document.getElementById('preview-back-btn');
  backBtn.textContent = '← Retour';
  backBtn.onclick = () => {
    document.getElementById('preview-media-wrap').innerHTML = '';
    closeModal('modal-preview');
    openModal('modal-guided');
  };
  backBtn.style.display = 'block';
  document.getElementById('preview-standalone-btn').style.display = 'none';
  document.getElementById('preview-add-btn').style.display = 'none';

  closeModal('modal-guided');
  openModal('modal-preview');
}

function startGuidedSession() {
  const p = GUIDED_PROGRAMS.find(x => x.id === currentGuidedProgramId);
  if (!p) return;
  const exercises = p.preview
    .map(name => EXERCISES_DB.find(e => e.name === name))
    .filter(Boolean)
    .map(ex => ({ exoId: ex.id, sets: [{reps:10},{reps:10},{reps:10}] }));
  if (!exercises.length) return;
  closeModal('modal-guided');
  const w = { id:'guided_'+p.id, name:p.name, days:3, duration:45, exercises };
  currentWorkout = w;
  sessionSeconds = 0;
  sessionExercises = exercises.map(e => ({...e, setsStatus: e.sets.map(s => ({...s, done:false}))}));
  document.getElementById('session-title').textContent = w.name.toUpperCase();
  renderSession(); updateSessionProgress(); openModal('modal-session');
  clearInterval(activeTimerInterval);
  activeTimerInterval = setInterval(() => {
    sessionSeconds++;
    const t = fmtTime(sessionSeconds);
    document.getElementById('session-timer').textContent = t;
    document.getElementById('active-bar-time').textContent = t;
  }, 1000);
  document.getElementById('active-bar-name').textContent = w.name;
  document.getElementById('active-bar-exo').textContent  = 'Tap pour reprendre';
  document.getElementById('active-bar').classList.add('visible');
}

// ── MUSCLE IMAGE MAP — SVG inline via data URI (no CORS issues) ──
// Silhouettes anatomiques simples en SVG
const MUSCLE_SVG = {
  'Pecs': `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="80" fill="none"/><ellipse cx="18" cy="32" rx="13" ry="10" fill="#4db8ff" opacity=".85"/><ellipse cx="42" cy="32" rx="13" ry="10" fill="#4db8ff" opacity=".85"/><path d="M10 42 Q18 50 30 44 Q42 50 50 42" stroke="#4db8ff" stroke-width="1.5" fill="none" opacity=".5"/><circle cx="30" cy="18" r="7" fill="#1a2a40" stroke="#263650" stroke-width="1.5"/><rect x="26" y="25" width="8" height="14" rx="2" fill="#1a2a40" stroke="#263650" stroke-width="1"/></svg>`,
  'Épaules': `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="80" fill="none"/><circle cx="30" cy="18" r="7" fill="#1a2a40" stroke="#263650" stroke-width="1.5"/><rect x="26" y="25" width="8" height="14" rx="2" fill="#1a2a40" stroke="#263650" stroke-width="1"/><ellipse cx="10" cy="32" rx="9" ry="9" fill="#4db8ff" opacity=".9"/><ellipse cx="50" cy="32" rx="9" ry="9" fill="#4db8ff" opacity=".9"/></svg>`,
  'Triceps': `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="80" fill="none"/><circle cx="30" cy="16" r="7" fill="#1a2a40" stroke="#263650" stroke-width="1.5"/><rect x="26" y="23" width="8" height="12" rx="2" fill="#1a2a40" stroke="#263650" stroke-width="1"/><path d="M9 32 Q6 44 8 56 Q10 62 14 62" stroke="#4db8ff" stroke-width="7" stroke-linecap="round" fill="none" opacity=".85"/><path d="M51 32 Q54 44 52 56 Q50 62 46 62" stroke="#4db8ff" stroke-width="7" stroke-linecap="round" fill="none" opacity=".85"/></svg>`,
  'Dos': `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="80" fill="none"/><circle cx="30" cy="14" r="7" fill="#1a2a40" stroke="#263650" stroke-width="1.5"/><path d="M12 28 Q6 40 10 58 L18 58 L22 38 L30 42 L38 38 L42 58 L50 58 Q54 40 48 28 Q40 22 30 24 Q20 22 12 28Z" fill="#4db8ff" opacity=".85"/></svg>`,
  'Biceps': `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="80" fill="none"/><circle cx="30" cy="16" r="7" fill="#1a2a40" stroke="#263650" stroke-width="1.5"/><rect x="26" y="23" width="8" height="12" rx="2" fill="#1a2a40" stroke="#263650" stroke-width="1"/><path d="M9 32 Q5 38 7 50 Q9 58 14 60" stroke="#263650" stroke-width="8" stroke-linecap="round" fill="none"/><path d="M9 32 Q5 38 7 46 Q9 54 14 56" stroke="#4db8ff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".9"/><path d="M51 32 Q55 38 53 50 Q51 58 46 60" stroke="#263650" stroke-width="8" stroke-linecap="round" fill="none"/><path d="M51 32 Q55 38 53 46 Q51 54 46 56" stroke="#4db8ff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".9"/></svg>`,
  'Quadriceps': `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="80" fill="none"/><ellipse cx="30" cy="22" rx="14" ry="10" fill="#1a2a40" stroke="#263650" stroke-width="1.5"/><path d="M16 30 Q12 44 14 62 L22 62 L24 44 L26 62 L34 62 L36 44 L38 62 L46 62 Q48 44 44 30Z" fill="#4db8ff" opacity=".85"/></svg>`,
  'Fessiers': `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="80" fill="none"/><ellipse cx="20" cy="38" rx="16" ry="18" fill="#4db8ff" opacity=".85"/><ellipse cx="40" cy="38" rx="16" ry="18" fill="#4db8ff" opacity=".85"/><rect x="22" y="14" width="16" height="22" rx="3" fill="#1a2a40" stroke="#263650" stroke-width="1"/></svg>`,
  'Ischio-jambiers': `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="80" fill="none"/><ellipse cx="30" cy="22" rx="14" ry="10" fill="#1a2a40" stroke="#263650" stroke-width="1.5"/><path d="M17 30 Q14 46 16 64 L24 64 L26 46 L30 50 L34 46 L36 64 L44 64 Q46 46 43 30Z" fill="#263650" opacity=".7"/><path d="M17 30 Q14 46 16 64 L24 64 L26 46 L30 50 L34 46 L36 64 L44 64 Q46 46 43 30Z" fill="#4db8ff" opacity=".7"/></svg>`,
  'Mollets': `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="80" fill="none"/><path d="M18 10 Q14 28 16 46 Q18 58 20 62 L24 62 Q26 54 26 46 Q26 36 24 10Z" fill="#263650" opacity=".6"/><path d="M42 10 Q46 28 44 46 Q42 58 40 62 L36 62 Q34 54 34 46 Q34 36 36 10Z" fill="#263650" opacity=".6"/><path d="M20 22 Q16 36 18 52 Q20 60 22 64 L26 64 Q28 56 27 46 Q26 34 24 22Z" fill="#4db8ff" opacity=".85"/><path d="M40 22 Q44 36 42 52 Q40 60 38 64 L34 64 Q32 56 33 46 Q34 34 36 22Z" fill="#4db8ff" opacity=".85"/></svg>`,
  'Abdominaux': `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="80" fill="none"/><rect x="22" y="20" width="7" height="8" rx="2" fill="#4db8ff" opacity=".9"/><rect x="31" y="20" width="7" height="8" rx="2" fill="#4db8ff" opacity=".9"/><rect x="22" y="31" width="7" height="8" rx="2" fill="#4db8ff" opacity=".85"/><rect x="31" y="31" width="7" height="8" rx="2" fill="#4db8ff" opacity=".85"/><rect x="22" y="42" width="7" height="8" rx="2" fill="#4db8ff" opacity=".8"/><rect x="31" y="42" width="7" height="8" rx="2" fill="#4db8ff" opacity=".8"/><line x1="30" y1="18" x2="30" y2="52" stroke="#1a2a40" stroke-width="1.5"/></svg>`,
  'Obliques': `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="80" fill="none"/><rect x="24" y="22" width="6" height="7" rx="1.5" fill="#263650" opacity=".7"/><rect x="30" y="22" width="6" height="7" rx="1.5" fill="#263650" opacity=".7"/><rect x="24" y="32" width="6" height="7" rx="1.5" fill="#263650" opacity=".7"/><rect x="30" y="32" width="6" height="7" rx="1.5" fill="#263650" opacity=".7"/><path d="M14 20 Q10 32 12 50 Q14 58 18 60 L22 55 L20 40 L24 28Z" fill="#4db8ff" opacity=".85"/><path d="M46 20 Q50 32 48 50 Q46 58 42 60 L38 55 L40 40 L36 28Z" fill="#4db8ff" opacity=".85"/></svg>`,
  'Gainage': `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="80" fill="none"/><rect x="16" y="28" width="28" height="24" rx="4" fill="#4db8ff" opacity=".85"/><circle cx="30" cy="16" r="7" fill="#1a2a40" stroke="#263650" stroke-width="1.5"/><rect x="26" y="23" width="8" height="6" rx="1.5" fill="#1a2a40" stroke="#263650" stroke-width="1"/><rect x="26" y="52" width="8" height="18" rx="2" fill="#1a2a40" stroke="#263650" stroke-width="1"/></svg>`,
  'Cardio': `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="80" fill="none"/><path d="M30 56 L10 36 Q4 26 14 20 Q22 16 30 28 Q38 16 46 20 Q56 26 50 36Z" fill="#ff4f6a" opacity=".9"/><path d="M8 42 L14 42 L18 34 L22 50 L26 38 L30 44 L34 38 L38 50 L42 34 L46 42 L52 42" stroke="#4db8ff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/></svg>`,
  'Tous': `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="80" fill="none"/><circle cx="30" cy="14" r="7" fill="#263650" stroke="#4db8ff" stroke-width="1.5"/><path d="M12 26 Q6 40 10 58 L18 58 L22 38 L30 42 L38 38 L42 58 L50 58 Q54 40 48 26 Q40 20 30 22 Q20 20 12 26Z" fill="#263650" stroke="#4db8ff" stroke-width="1" opacity=".9"/><path d="M9 30 Q5 44 8 58 L16 56 L14 40Z" fill="#4db8ff" opacity=".6"/><path d="M51 30 Q55 44 52 58 L44 56 L46 40Z" fill="#4db8ff" opacity=".6"/></svg>`,
};

function getMuscleImg(muscle) {
  const maps = {
    'Pecs':            bodyFront({pecs:1}),
    'Épaules':         bodyFront({shoulders:1}),
    'Triceps':         bodyBack({triceps:1}),
    'Dos':             bodyBack({lats:1, traps:1}),
    'Biceps':          bodyFront({biceps:1}),
    'Quadriceps':      bodyFront({quads:1}),
    'Fessiers':        bodyBack({glutes:1}),
    'Ischio-jambiers': bodyBack({hamstrings:1}),
    'Mollets':         bodyBack({calves:1}),
    'Abdominaux':      bodyFront({abs:1}),
    'Obliques':        bodyFront({obliques:1}),
    'Gainage':         bodyFront({abs:1, obliques:1}),
    'Cardio':          bodyFront({quads:1, shoulders:1, abs:1}),
    'Tous':            bodyFront({pecs:1, shoulders:1, abs:1, quads:1}),
  };
  const svg = maps[muscle];
  if (!svg) return null;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

// ── CHIP EMOJI fallback ──
const CHIP_EMOJI = { 'Tous':'🏋️', 'Cardio':'❤️', 'Gainage':'🧱' };

// ── YouTube search IDs per exercise (embed preview) ──
const YOUTUBE_MAP = {
  'pu':        'IODxDxX7oi4',  // push up tutorial
  'puw':       'IODxDxX7oi4',
  'pud':       '4x-QMTe8hTk',  // diamond push up
  'pue':       'IGlPzgBFrG4',  // clap push up
  'sq':        'aclHkVaku9U',  // squat tutorial
  'sqj':       'YGGq0AE5-PQ',  // jump squat
  'pistol':    'vq5-vdgJc0I',  // pistol squat
  'bsq':       '2C-uNgKwPLE',  // bulgarian split squat
  'lunge':     'QOVaHwm-Q6U',  // lunge tutorial
  'glute':     'xDmFkJxPzeM',  // hip thrust
  'plank':     'ASdvN_XEl_c',  // plank tutorial
  'crunch':    'Xyd_fa5zoEU',  // crunch tutorial
  'mntclimb':  'nmwgirgXLYM',  // mountain climbers
  'burpee':    'TU8QYVW0gDU',  // burpee tutorial
  'jj':        'iSSAk4XCsRA',  // jumping jacks
  'highk':     'ZZZoCNMU48U',  // high knees
  'dip':       '2z8JmcrW-As',  // dips
  'pike':      'x7_I5SUAd00',  // pike pushup
  'row':       'eGo4IYlbE5g',  // pull up
  'chinup':    'eGo4IYlbE5g',
  'invrow':    'G_1xzbISdGU',  // inverted row
  'nordham':   'd2LGDoGRFpw',  // nordic hamstring
  'russ':      'wkD8rjkodUI',  // russian twist
  'vup':       'iP2fjvG0g3w',  // v up
  'dragon':    'pvz7k5gOqOw',  // dragon flag
};

// ── Chip drag state (pointer-based, no DOM regen) ──
let chipOrder        = [];
let chipDragging     = null;   // muscle value being dragged
let chipDragStartX   = 0;
let chipDragGhost    = null;

// ── BUILD & RENDER CHIPS ──
function buildFilterChips() {
  chipOrder = MUSCLE_FILTERS.map(f => f.value);
  renderChips();
  initChipPointerDrag();
}

function renderChips() {
  const container = document.getElementById('muscle-filter-chips');
  container.innerHTML = chipOrder.map(val => {
    const f     = MUSCLE_FILTERS.find(x => x.value === val);
    if (!f) return '';
    const img   = getMuscleImg(val);
    const active = val === currentFilterMuscle;
    return `<div class="muscle-chip${active?' active':''}${val==='Tous'?' chip-all':''}" data-muscle="${val}">
      <div class="chip-img-wrap">
        ${img ? `<img src="${img}" alt="${val}">` : `<span class="chip-emoji">${CHIP_EMOJI[val]||'💪'}</span>`}
      </div>
      <div class="chip-label">${val}</div>
    </div>`;
  }).join('');
  // Bind click & pointer events after render
  document.querySelectorAll('.muscle-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (chipDragging) return;
      filterMuscle(chip.dataset.muscle);
    });
  });
  initChipPointerDrag();
}

function initChipPointerDrag() {
  const container = document.getElementById('muscle-filter-chips');
  // Remove old listeners by cloning
  const fresh = container.cloneNode(true);
  container.parentNode.replaceChild(fresh, container);
  const c = document.getElementById('muscle-filter-chips');

  // Re-bind clicks
  c.querySelectorAll('.muscle-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (chipDragging) return;
      filterMuscle(chip.dataset.muscle);
    });
  });

  let pointerDownChip = null;
  let startX = 0, startY = 0;
  let chipDragTimer   = null;
  let isDraggingChip  = false;

  c.addEventListener('pointerdown', e => {
    const chip = e.target.closest('.muscle-chip');
    if (!chip) return;
    pointerDownChip = chip;
    startX = e.clientX; startY = e.clientY;
    isDraggingChip = false;

    // Long-press (300ms) activates drag mode — avoids conflicting with scroll
    chipDragTimer = setTimeout(() => {
      isDraggingChip = true;
      chipDragging   = chip.dataset.muscle;
      chip.classList.add('dragging-chip');
      // Now capture to track movement
      try { chip.setPointerCapture(e.pointerId); } catch(err) {}
    }, 300);
  }, { passive: true });

  c.addEventListener('pointermove', e => {
    if (!pointerDownChip) return;
    const dx = Math.abs(e.clientX - startX);
    const dy = Math.abs(e.clientY - startY);
    // If user scrolls horizontally before long-press fires → cancel drag
    if (!isDraggingChip && dx > 8) {
      clearTimeout(chipDragTimer);
      pointerDownChip = null;
      return;
    }
    if (!isDraggingChip) return;
    // Only block scroll when actually dragging chips
    e.preventDefault();
    pointerDownChip.style.pointerEvents = 'none';
    const el = document.elementFromPoint(e.clientX, e.clientY);
    pointerDownChip.style.pointerEvents = '';
    const target = el && el.closest('.muscle-chip');
    c.querySelectorAll('.muscle-chip').forEach(x => x.classList.remove('drag-over-chip'));
    if (target && target !== pointerDownChip) {
      target.classList.add('drag-over-chip');
      const from = chipOrder.indexOf(chipDragging);
      const to   = chipOrder.indexOf(target.dataset.muscle);
      if (from >= 0 && to >= 0 && from !== to) {
        chipOrder.splice(from, 1);
        chipOrder.splice(to, 0, chipDragging);
        if (from < to) c.insertBefore(pointerDownChip, target.nextSibling);
        else           c.insertBefore(pointerDownChip, target);
      }
    }
  }, { passive: false });

  c.addEventListener('pointerup', () => {
    clearTimeout(chipDragTimer);
    if (pointerDownChip) {
      pointerDownChip.classList.remove('dragging-chip');
      c.querySelectorAll('.muscle-chip').forEach(x => x.classList.remove('drag-over-chip'));
    }
    chipDragging   = null;
    pointerDownChip = null;
    isDraggingChip  = false;
  }, { passive: true });

  c.addEventListener('pointercancel', () => {
    clearTimeout(chipDragTimer);
    if (pointerDownChip) pointerDownChip.classList.remove('dragging-chip');
    c.querySelectorAll('.muscle-chip').forEach(x => x.classList.remove('drag-over-chip'));
    chipDragging = null; pointerDownChip = null; isDraggingChip = false;
  }, { passive: true });
}

// ── PREVIEW avec YouTube ──
function openExoPreview(exoId, fromWorkout = false) {
  previewExoId = exoId;
  const ex = getExo(exoId); if (!ex) return;
  const gif    = resolveExoImg(ex);
  const ytId   = YOUTUBE_MAP[exoId];

  document.getElementById('preview-title').textContent  = ex.name;
  document.getElementById('preview-desc').textContent   = ex.desc || '';
  document.getElementById('preview-muscle').textContent = ex.muscle;
  document.getElementById('preview-tags').innerHTML     = ex.tags.map(t=>`<span class="exo-tag">${t}</span>`).join('');

  const mediaWrap = document.getElementById('preview-media-wrap');

  if (ytId) {
    // YouTube embed — autoplay, muted, loop
    mediaWrap.style.display = 'block';
    mediaWrap.innerHTML = `
      <div class="preview-video-wrap">
        <iframe
          src="https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=1&rel=0&modestbranding=1"
          allow="autoplay; encrypted-media"
          allowfullscreen
          frameborder="0"
          class="preview-iframe">
        </iframe>
      </div>`;
  } else if (gif) {
    mediaWrap.style.display = 'block';
    mediaWrap.innerHTML = `
      <div class="preview-gif-wrap">
        <img src="${gif}" class="preview-gif-img" alt="${ex.name}">
      </div>`;
  } else {
    mediaWrap.style.display = 'none';
    mediaWrap.innerHTML = '';
  }
  if (fromWorkout) {
    const backBtn = document.getElementById('preview-back-btn');
    backBtn.textContent = '← Retour';
    backBtn.onclick = () => {
      document.getElementById('preview-media-wrap').innerHTML = '';
      closeModal('modal-preview');
      openModal('modal-workout');
    };
    backBtn.style.display = 'block';
    document.getElementById('preview-standalone-btn').style.display = 'none';
    document.getElementById('preview-add-btn').style.display = 'none';
    closeModal('modal-workout');
  } else {
    document.getElementById('preview-back-btn').style.display = 'none';
    document.getElementById('preview-standalone-btn').style.display = 'block';
    document.getElementById('preview-add-btn').style.display = 'flex';
  }
  openModal('modal-preview');
}
function addExoFromPreview() {
  if (previewExoId && !workoutExercises.some(we=>we.exoId===previewExoId))
    workoutExercises.push({ exoId:previewExoId, sets:[{reps:10},{reps:10},{reps:10}] });
  const wrap = document.getElementById('preview-media-wrap');
  if (wrap) wrap.innerHTML = '';
  closeModal('modal-preview');
  renderWorkoutExoPicker();
  openModal('modal-workout');
}
function closePreview() {
  const wrap = document.getElementById('preview-media-wrap');
  if (wrap) wrap.innerHTML = '';
  closeModal('modal-preview');
}
function closePreviewBackToPicker() {
  const wrap = document.getElementById('preview-media-wrap');
  if (wrap) wrap.innerHTML = '';
  closeModal('modal-preview');
  renderPickerExos(document.getElementById('picker-search').value || '');
  openModal('modal-exo-picker');
}

// ── RENDER PROGRAMMES ──
function renderWorkouts() {
  const list = document.getElementById('workout-list');
  if (!workouts.length) { list.innerHTML=`<div class="empty-state"><div class="big-icon">🏋️</div><p>Aucun programme.<br>Crée ton premier entraînement !</p></div>`; return; }
  list.innerHTML = workouts.map(w => {
    const exos = w.exercises||[];
    const preview = exos.slice(0,3).map(e=>{const ex=getExo(e.exoId);return ex?`<div class="exo-preview"><span class="exo-preview-name">${ex.emoji} ${ex.name}</span><span class="exo-preview-sets">${e.sets.length} série${e.sets.length>1?'s':''}</span></div>`:''}).join('');
    const more = exos.length>3?`<div class="exo-more">+${exos.length-3} exercice${exos.length-3>1?'s':''}</div>`:'';
    return `<div class="workout-card" onclick="editWorkout('${w.id}')">
      <div class="workout-card-header">
        <div class="workout-name">${w.name}</div>
        <div class="card-actions-col">
          <div class="workout-badge">${exos.length} exo${exos.length>1?'s':''}</div>
          <div class="card-btn-row">
            <div class="icon-btn icon-btn--sm" onclick="event.stopPropagation();editWorkout('${w.id}')">
              <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </div>
            <div class="icon-btn icon-btn--sm icon-btn--danger" onclick="event.stopPropagation();deleteWorkout('${w.id}')">
              <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
            </div>
          </div>
        </div>
      </div>
      <div class="workout-meta">
        <div class="meta-item"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>${w.days}× / semaine</div>
        <div class="meta-item"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>~${w.duration} min</div>
      </div>
      ${exos.length?`<div class="workout-exercises">${preview}${more}</div>`:''}
      <div class="card-start-wrap"><button class="start-btn" onclick="event.stopPropagation();startSession('${w.id}')">DÉMARRER</button></div>
    </div>`;
  }).join('');
}

// ── RENDER EXERCICES ──
function buildGroups(exoList) {
  const groups = {};
  MUSCLE_ORDER.forEach(m => { groups[m] = []; });
  exoList.forEach(e => { if (!groups[e.muscle]) groups[e.muscle]=[]; groups[e.muscle].push(e); });
  return groups;
}

function renderExercices(muscleFilter='Tous', search='') {
  const list = document.getElementById('exo-list');
  let f = EXERCISES_DB;
  if (muscleFilter !== 'Tous') f = f.filter(e => e.muscle === muscleFilter);
  if (search) f = f.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.tags.some(t=>t.toLowerCase().includes(search.toLowerCase())));
  if (!f.length) { list.innerHTML=`<div class="empty-state"><div class="big-icon">🔍</div><p>Aucun exercice trouvé.</p></div>`; return; }

  const groups = buildGroups(f);
  const muscleKeys = Object.entries(groups).filter(([,exos])=>exos.length>0).map(([m])=>m);

  list.innerHTML = muscleKeys.map((muscle)=>{
    const exos = groups[muscle];
    const secId = 'section-' + muscle.replace(/[^a-zA-Z]/g,'');
    return `
    <div class="muscle-section" id="${secId}">
      <div class="muscle-group-header">
        <span class="drag-handle" data-section="${muscle}" title="Glisser pour réorganiser"
              onmousedown="sectionDragStart(event,'${muscle}')"
              ontouchstart="sectionDragStart(event,'${muscle}')">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="5" r="1.2" fill="currentColor"/><circle cx="9" cy="12" r="1.2" fill="currentColor"/><circle cx="9" cy="19" r="1.2" fill="currentColor"/><circle cx="15" cy="5" r="1.2" fill="currentColor"/><circle cx="15" cy="12" r="1.2" fill="currentColor"/><circle cx="15" cy="19" r="1.2" fill="currentColor"/></svg>
        </span>
        <span class="muscle-group-img"><img src="${getMuscleImg(muscle) || ''}" style="width:28px;height:28px;object-fit:cover;border-radius:6px;display:${getMuscleImg(muscle)?'block':'none'}"></span>
        <span class="muscle-group-name">${muscle}</span>
        <span class="muscle-group-count">${exos.length}</span>
      </div>
      ${exos.map(e=>{
        const gif=resolveExoImg(e);
        return `<div class="exo-item" onclick="openExoPreview('${e.id}')">
          <div class="exo-icon-wrap">
            ${gif
              ? `<img src="${gif}" class="exo-thumb" loading="lazy" onerror="this.style.display='none';this.nextSibling.style.display='flex'">
                 <div class="exo-icon" style="display:none">${e.emoji}</div>`
              : `<div class="exo-icon">${e.emoji}</div>`}
          </div>
          <div class="exo-info">
            <div class="exo-name">${e.name}</div>
            <div class="exo-tags">${e.tags.slice(0,3).map(t=>`<span class="exo-tag">${t}</span>`).join('')}</div>
          </div>
          <svg width="14" height="14" fill="none" stroke="var(--muted)" stroke-width="2.2" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M9 18l6-6-6-6"/></svg>
        </div>`;
      }).join('')}
    </div>`;
  }).join('');

  // Init drag order from current muscle order
  updateSectionOrder(muscleKeys);
}

// ── DRAG & DROP muscle sections (pointer-based, handle only) ──
let draggedMuscle  = null;
let muscleOrder    = [...MUSCLE_ORDER];

function updateSectionOrder(order) { muscleOrder = order; }

function sectionDragStart(event, muscle) {
  event.stopPropagation();
  const section = document.getElementById('section-' + muscle.replace(/[^a-zA-Z]/g,''));
  if (!section) return;
  draggedMuscle = muscle;
  section.classList.add('dragging');
  const list = document.getElementById('exo-list');

  function onMove(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    section.style.pointerEvents = 'none';
    const el = document.elementFromPoint(clientX, clientY);
    section.style.pointerEvents = '';
    const target = el && el.closest('.muscle-section');
    if (target && target !== section) {
      const rect = target.getBoundingClientRect();
      if (clientY < rect.top + rect.height / 2) list.insertBefore(section, target);
      else list.insertBefore(section, target.nextSibling);
    }
  }
  function onEnd() {
    section.classList.remove('dragging');
    draggedMuscle = null;
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup',   onEnd);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend',  onEnd);
  }
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup',   onEnd);
  document.addEventListener('touchmove', onMove, { passive:true });
  document.addEventListener('touchend',  onEnd);
}

// stubs vides (plus utilisés)
function dragSection()     {}
function dragOverSection() {}
function dragEndSection()  {}
function dropSection()     {}


function filterExercices(val) { renderExercices(currentFilterMuscle, val); }
function filterMuscle(muscle) {
  currentFilterMuscle = muscle;
  renderChips();
  renderExercices(muscle, document.getElementById('exo-search').value);
}

// ── HISTORY ──
function renderHistory() {
  const all = sessionHistory.slice(); // desc order from Firestore
  const today = new Date(); today.setHours(0,0,0,0);

  // Global stats
  document.getElementById('stat-sessions').textContent = all.filter(s => new Date(s.date).getMonth() === new Date().getMonth()).length;
  let streak = 0;
  for(let i = 0; i < 30; i++){
    const d = new Date(today); d.setDate(d.getDate()-i);
    if(all.some(s => new Date(s.date).toDateString() === d.toDateString())) streak++;
    else if(i > 0) break;
  }
  document.getElementById('stat-streak').innerHTML = `${streak}<span>j</span>`;
  const dayLabels = ['L','M','M','J','V','S','D'];
  const monday = new Date(today);
  monday.setDate(today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1));
  document.getElementById('streak-row').innerHTML = Array.from({length:7}, (_,i) => {
    const d = new Date(monday); d.setDate(monday.getDate() + i);
    const done = all.some(s => new Date(s.date).toDateString() === d.toDateString());
    const isToday = d.toDateString() === today.toDateString();
    const isSelected = d.toDateString() === historyViewDate.toDateString();
    const iso = d.toISOString();
    return `<div class="streak-day${done?' done':''}${isToday?' today':''}${isSelected?' selected':''}" onclick="historySetDay('${iso}')">${dayLabels[i]}</div>`;
  }).join('');

  // Day navigator
  const isToday = historyViewDate.toDateString() === today.toDateString();
  document.getElementById('history-nav-date').textContent = isToday
    ? "AUJOURD'HUI"
    : historyViewDate.toLocaleDateString('fr-FR', {weekday:'short', day:'numeric', month:'short'}).toUpperCase();
  const nextBtn = document.getElementById('history-nav-next');
  nextBtn.disabled = historyViewDate >= today;
  nextBtn.style.opacity = historyViewDate >= today ? '0.3' : '1';
  document.getElementById('history-section-title').textContent = isToday ? 'SÉANCES DU JOUR' : 'SÉANCES';

  // Filter by selected day
  const daySessions = all.filter(s => new Date(s.date).toDateString() === historyViewDate.toDateString());
  const hl = document.getElementById('history-list');
  if(!daySessions.length){
    hl.innerHTML = `<div class="empty-state"><div class="big-icon">📋</div><p>${isToday ? 'Aucune séance aujourd\'hui.<br>Lance ton premier entraînement !' : 'Aucune séance ce jour-là.'}</p></div>`;
    return;
  }
  hl.innerHTML = daySessions.map(s => {
    const d = new Date(s.date);
    return `<div class="history-entry">
      <div class="history-item" id="hist-${s.id}" onclick="toggleSessionDetail('${s.id}')">
        <div class="history-dot"></div>
        <div class="history-info">
          <div class="history-name">${s.name}</div>
          <div class="history-date">${d.toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'short'})} · ${s.exercises} exercice${s.exercises>1?'s':''}</div>
        </div>
        <div class="history-item-right">
          <div class="history-duration">${Math.floor(s.duration/60)}min</div>
          <svg class="history-chevron" width="14" height="14" fill="none" stroke="var(--muted)" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </div>
      <div class="history-exo-expand" id="expand-${s.id}"></div>
    </div>`;
  }).join('');
}

function buildSessionExoHTML(s) {
  if (s.exercisesList && s.exercisesList.length) {
    return s.exercisesList.map(e => {
      const ex = getExo(e.exoId);
      if (!ex) return '';
      const pct = e.totalSets > 0 ? Math.round(e.setsCompleted / e.totalSets * 100) : 0;
      return `<div class="expand-exo-row">
        <span class="expand-exo-emoji">${ex.emoji}</span>
        <div class="expand-exo-info">
          <div class="expand-exo-name">${ex.name}</div>
          <div class="expand-exo-sets">${e.setsCompleted}/${e.totalSets} séries</div>
        </div>
        <div class="expand-exo-badge${pct===100?' done':''}">${pct===100?'✓':pct+'%'}</div>
      </div>`;
    }).join('');
  }
  const matchingWorkout = workouts.find(w => w.name === s.name);
  if (matchingWorkout && matchingWorkout.exercises && matchingWorkout.exercises.length) {
    return `<div class="expand-exo-note">Programme (détail exact non disponible)</div>` +
      matchingWorkout.exercises.map(e => {
        const ex = getExo(e.exoId);
        if (!ex) return '';
        return `<div class="expand-exo-row">
          <span class="expand-exo-emoji">${ex.emoji}</span>
          <div class="expand-exo-info">
            <div class="expand-exo-name">${ex.name}</div>
            <div class="expand-exo-sets">${e.sets.length} série${e.sets.length>1?'s':''} · ${e.sets[0].reps} reps</div>
          </div>
          <div class="expand-exo-badge">—</div>
        </div>`;
      }).join('');
  }
  return `<div class="expand-exo-note" style="padding:14px 16px">Programme introuvable ou supprimé.</div>`;
}

function toggleSessionDetail(sessionId) {
  const expand = document.getElementById('expand-' + sessionId);
  const item   = document.getElementById('hist-'   + sessionId);
  if (!expand || !item) return;
  const isOpen = expand.classList.contains('open');
  // Ferme tous les autres
  document.querySelectorAll('.history-exo-expand.open').forEach(el => el.classList.remove('open'));
  document.querySelectorAll('.history-item.expanded').forEach(el => el.classList.remove('expanded'));
  if (!isOpen) {
    const s = sessionHistory.find(x => x.id === sessionId);
    if (s) expand.innerHTML = buildSessionExoHTML(s);
    expand.classList.add('open');
    item.classList.add('expanded');
  }
}

function openSessionDetail(sessionId) { toggleSessionDetail(sessionId); }

function historyChangeDay(delta) {
  const next = new Date(historyViewDate);
  next.setDate(next.getDate() + delta);
  historyViewDate = next;
  renderHistory();
}

function historySetDay(iso) {
  historyViewDate = new Date(iso);
  historyViewDate.setHours(0,0,0,0);
  renderHistory();
  document.getElementById('history-list').scrollIntoView({behavior:'smooth', block:'start'});
}

// ── RESET HISTORY (code 9833) ──
function pinInput(digit) {
  if(pinCurrent.length >= 4) return;
  pinCurrent += digit;
  updatePinDisplay();
  if(pinCurrent.length === 4) {
    if(pinCurrent === '9833') {
      pinCurrent = '';
      closeModal('modal-pin');
      resetAllHistory();
    } else {
      document.getElementById('pin-display').classList.add('pin-shake');
      setTimeout(() => {
        document.getElementById('pin-display').classList.remove('pin-shake');
        pinCurrent = '';
        updatePinDisplay();
      }, 500);
    }
  }
}

function pinBackspace() {
  pinCurrent = pinCurrent.slice(0, -1);
  updatePinDisplay();
}

function updatePinDisplay() {
  const spans = document.querySelectorAll('#pin-display span');
  spans.forEach((s, i) => {
    s.classList.toggle('filled', i < pinCurrent.length);
  });
}

async function resetAllHistory() {
  await Promise.all(sessionHistory.map(s => deleteDoc(doc(db, 'sessionHistory', s.id))));
  document.getElementById('btn-reset-history').style.display = 'none';
}

function showResetBtn() {
  document.getElementById('btn-reset-history').style.display = 'flex';
}

// Long-press on section title to reveal reset button
(function() {
  let t = null;
  function start() { t = setTimeout(showResetBtn, 700); }
  function cancel() { clearTimeout(t); }
  const el = document.getElementById('history-section-title');
  if(!el) return;
  el.addEventListener('touchstart', start, {passive:true});
  el.addEventListener('touchend', cancel);
  el.addEventListener('mousedown', start);
  el.addEventListener('mouseup', cancel);
  el.addEventListener('mouseleave', cancel);
})();

// Keyboard sequence 9-8-3-3 to reveal reset button
(function() {
  let seq = '';
  document.addEventListener('keydown', e => {
    if('9833'.startsWith(seq + e.key)) {
      seq += e.key;
      if(seq === '9833') { showResetBtn(); seq = ''; }
    } else {
      seq = '9833'.startsWith(e.key) ? e.key : '';
    }
  });
})()

// ── TABS ──
function switchTab(id, btn) {
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('view-'+id).classList.add('active'); btn.classList.add('active');
  if(id==='exercices')  renderExercices(currentFilterMuscle);
  if(id==='historique') renderHistory();
}

// ── WORKOUT MODAL ──
function openNewWorkout(){editingWorkoutId=null;workoutExercises=[];document.getElementById('input-workout-name').value='';document.getElementById('modal-workout-title').textContent='NOUVEAU PROGRAMME';renderWorkoutExoPicker();updateEstimates();openModal('modal-workout');}
function editWorkout(id){const w=workouts.find(x=>x.id===id);if(!w)return;editingWorkoutId=id;workoutExercises=w.exercises.map(e=>({exoId:e.exoId,sets:e.sets.map(s=>({...s}))}));document.getElementById('input-workout-name').value=w.name;document.getElementById('modal-workout-title').textContent='MODIFIER LE PROGRAMME';renderWorkoutExoPicker();updateEstimates();openModal('modal-workout');}
function deleteWorkout(id){if(!confirm('Supprimer ce programme ?'))return;deleteWorkoutFromDb(id);}

function renderWorkoutExoPicker() {
  updateEstimates();
  const c=document.getElementById('workout-exo-picker');
  if(!workoutExercises.length){c.innerHTML='';return;}
  c.innerHTML=workoutExercises.map((we,i)=>{
    const ex=getExo(we.exoId);if(!ex)return'';
    return `<div class="picker-exo-card">
      <div class="picker-exo-header">
        <span class="picker-exo-emoji" style="cursor:pointer" onclick="openExoPreview('${ex.id}',true)">${ex.emoji}</span>
        <div class="picker-exo-info" style="cursor:pointer" onclick="openExoPreview('${ex.id}',true)">
          <div class="picker-exo-name">${ex.name}</div>
          <div class="picker-exo-muscle">${ex.muscle}</div>
        </div>
        <button class="set-remove" onclick="removeWorkoutExo(${i})"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
      </div>
      <div class="sets-editor">${we.sets.map((s,si)=>`
        <div class="set-row">
          <div class="set-num">${si+1}</div>
          <input class="set-input" type="number" value="${s.reps}" placeholder="10" onchange="updateSet(${i},${si},this.value)">
          <div class="set-label">${ex.name.toLowerCase().includes('planche')?'sec':'reps'}</div>
          <button class="set-remove" onclick="removeSet(${i},${si})"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
        </div>`).join('')}</div>
      <button class="add-set-btn add-set-btn--mt" onclick="addSet(${i})">
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Ajouter une série
      </button>
    </div>`;
  }).join('');
}
function removeWorkoutExo(i){workoutExercises.splice(i,1);renderWorkoutExoPicker();}
function addSet(i){const l=workoutExercises[i].sets.slice(-1)[0];workoutExercises[i].sets.push({reps:l?l.reps:10});renderWorkoutExoPicker();}
function removeSet(i,si){if(workoutExercises[i].sets.length<=1)return;workoutExercises[i].sets.splice(si,1);renderWorkoutExoPicker();}
function updateSet(i,si,val){workoutExercises[i].sets[si].reps=parseInt(val)||10;}

async function saveWorkout(){
  const name=document.getElementById('input-workout-name').value.trim();
  if(!name){alert('Donne un nom au programme !');return;}
  if(!workoutExercises.length){alert('Ajoute au moins un exercice !');return;}
  const w = {
    id: editingWorkoutId || 'w'+Date.now(),
    name,
    days: estimateDays(workoutExercises) || 3,
    duration: estimateDuration(workoutExercises) || 40,
    exercises: workoutExercises
  };
  await saveWorkoutToDb(w);
  closeModal('modal-workout');
}

// ── EXO PICKER ──
function switchToExoPickerMode(){closeModal('modal-workout');renderPickerExos('');document.getElementById('picker-search').value='';openModal('modal-exo-picker');}
function renderPickerExos(search){
  let f=EXERCISES_DB;
  if(search) f=f.filter(e=>e.name.toLowerCase().includes(search.toLowerCase())||e.muscle.toLowerCase().includes(search.toLowerCase()));
  const groups=buildGroups(f);
  document.getElementById('picker-exo-list').innerHTML=Object.entries(groups).filter(([,exos])=>exos.length>0).map(([muscle,exos])=>`
    <div class="muscle-group-header">
      ${getMuscleImg(muscle) ? `<img src="${getMuscleImg(muscle)}" style="width:28px;height:28px;object-fit:cover;border-radius:6px;flex-shrink:0">` : ''}
      <span class="muscle-group-name">${muscle}</span>
    </div>
    ${exos.map(e=>{
      const already=workoutExercises.some(we=>we.exoId===e.id);
      const gif=resolveExoImg(e);
      return `<div class="exo-item${already?' exo-already':''}">
        <div class="exo-icon-wrap" onclick="openExoPreviewFromPicker('${e.id}')">
          ${gif?`<img src="${gif}" class="exo-thumb" loading="lazy" onerror="this.style.display='none';this.nextSibling.style.display='flex'"><div class="exo-icon" style="display:none">${e.emoji}</div>`:`<div class="exo-icon">${e.emoji}</div>`}
        </div>
        <div class="exo-info" onclick="openExoPreviewFromPicker('${e.id}')">
          <div class="exo-name">${e.name}</div>
          <div class="exo-tags">${e.tags.slice(0,2).map(t=>`<span class="exo-tag">${t}</span>`).join('')}</div>
        </div>
        ${already
          ? `<span class="exo-check">✓</span>`
          : `<div class="exo-add-btn" onclick="pickExo('${e.id}')"><svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></div>`
        }
      </div>`;
    }).join('')}
  `).join('');
}
function filterPickerExos(val){renderPickerExos(val);}
function pickExo(id){if(!workoutExercises.some(we=>we.exoId===id))workoutExercises.push({exoId:id,sets:[{reps:10},{reps:10},{reps:10}]});closeModal('modal-exo-picker');renderWorkoutExoPicker();openModal('modal-workout');}

// Ouvre la preview depuis le picker — après fermeture revient au picker
function openExoPreviewFromPicker(exoId) {
  previewExoId = exoId;
  const ex = getExo(exoId); if (!ex) return;
  const gif  = resolveExoImg(ex);
  const ytId = YOUTUBE_MAP[exoId];

  document.getElementById('preview-title').textContent  = ex.name;
  document.getElementById('preview-desc').textContent   = ex.desc || '';
  document.getElementById('preview-muscle').textContent = ex.muscle;
  document.getElementById('preview-tags').innerHTML     = ex.tags.map(t=>`<span class="exo-tag">${t}</span>`).join('');

  const mediaWrap = document.getElementById('preview-media-wrap');
  if (ytId) {
    mediaWrap.style.display = 'block';
    mediaWrap.innerHTML = `<div class="preview-video-wrap"><iframe src="https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=1&rel=0&modestbranding=1" allow="autoplay; encrypted-media" allowfullscreen frameborder="0" class="preview-iframe"></iframe></div>`;
  } else if (gif) {
    mediaWrap.style.display = 'block';
    mediaWrap.innerHTML = `<div class="preview-gif-wrap"><img src="${gif}" class="preview-gif-img" alt="${ex.name}"></div>`;
  } else {
    mediaWrap.style.display = 'none';
    mediaWrap.innerHTML = '';
  }

  // Bouton ajouter adapté
  const alreadyAdded = workoutExercises.some(we=>we.exoId===exoId);
  document.getElementById('preview-add-btn').textContent = alreadyAdded ? '✓ DÉJÀ AJOUTÉ' : '+ AJOUTER';
  document.getElementById('preview-add-btn').disabled = alreadyAdded;
  document.getElementById('preview-add-btn').style.display = 'flex';
  document.getElementById('preview-back-btn').style.display = 'block';
  document.getElementById('preview-back-btn').textContent = '← Retour';
  document.getElementById('preview-back-btn').onclick = closePreviewBackToPicker;
  document.getElementById('preview-standalone-btn').style.display = 'none';

  closeModal('modal-exo-picker');
  openModal('modal-preview');
}

// ── SESSION ──
function startSession(workoutId){
  const w=workouts.find(x=>x.id===workoutId);if(!w)return;
  currentWorkout=w;sessionSeconds=0;
  sessionExercises=w.exercises.map(e=>({...e,setsStatus:e.sets.map(s=>({...s,done:false}))}));
  document.getElementById('session-title').textContent=w.name.toUpperCase();
  renderSession();updateSessionProgress();openModal('modal-session');
  clearInterval(activeTimerInterval);
  activeTimerInterval=setInterval(()=>{sessionSeconds++;const t=fmtTime(sessionSeconds);document.getElementById('session-timer').textContent=t;document.getElementById('active-bar-time').textContent=t;},1000);
  document.getElementById('active-bar-name').textContent=w.name;
  document.getElementById('active-bar-exo').textContent='Tap pour reprendre';
  document.getElementById('active-bar').classList.add('visible');
}

function renderSession(){
  const total=sessionExercises.length;
  const done=sessionExercises.filter(e=>e.setsStatus.every(s=>s.done)).length;
  document.getElementById('session-exo-list').innerHTML=
    sessionExercises.map((we,i)=>{
      const ex=getExo(we.exoId);if(!ex)return'';
      const allDone=we.setsStatus.every(s=>s.done);
      const gif=resolveExoImg(ex);
      return `<div class="session-exo-card${allDone?' session-exo-card--done':''}">
        <div class="session-exo-top">
          ${gif?`<img src="${gif}" class="session-exo-img" loading="lazy" onerror="this.style.display='none'">`:` <span class="session-exo-emoji">${ex.emoji}</span>`}
          <div class="session-exo-info">
            <div class="session-exo-name">${ex.name}</div>
            <div class="session-exo-muscle">${ex.muscle}</div>
          </div>
          ${allDone?`<span class="session-done-badge">✓ FAIT</span>`:''}
        </div>
        <div class="session-sets-list">
          ${we.setsStatus.map((s,si)=>`
          <div class="session-set-row${s.done?' session-set-row--done':''}">
            <div class="session-set-num">${si+1}</div>
            ${s.done
              ? `<div class="session-set-result"><span class="session-set-actual">${s.actualReps}</span><span class="session-set-target-done">/ ${s.reps}</span></div>`
              : `<div class="session-set-target">${s.reps} reps</div>
                 <input class="session-reps-input" type="number" id="actual-${i}-${si}" value="${s.reps}" min="0" max="999">`
            }
            <button onclick="${s.done?`undoSet(${i},${si})`:`validateSet(${i},${si})`}" class="btn-validate${s.done?' btn-validate--done':''}">
              ${s.done?'✓':'OK'}
            </button>
          </div>`).join('')}
        </div>
      </div>`;
    }).join('');
}

function validateSet(exoI, setI) {
  const input = document.getElementById(`actual-${exoI}-${setI}`);
  const actual = parseInt(input?.value) || sessionExercises[exoI].setsStatus[setI].reps;
  sessionExercises[exoI].setsStatus[setI].done = true;
  sessionExercises[exoI].setsStatus[setI].actualReps = actual;
  renderSession();
  updateSessionProgress();
}
function undoSet(exoI, setI) {
  sessionExercises[exoI].setsStatus[setI].done = false;
  sessionExercises[exoI].setsStatus[setI].actualReps = undefined;
  renderSession();
  updateSessionProgress();
}
function toggleSet(exoI,setI){ sessionExercises[exoI].setsStatus[setI].done ? undoSet(exoI,setI) : validateSet(exoI,setI); }
function updateSessionProgress(){
  const total=sessionExercises.length;
  const done=sessionExercises.filter(e=>e.setsStatus.every(s=>s.done)).length;
  document.getElementById('session-progress').textContent=`${done}/${total} exercices`;
  const bar=document.getElementById('session-progress-bar');
  if(bar)bar.style.width=(total?Math.round(done/total*100):0)+'%';
}
function endSession(){
  const allDone=sessionExercises.every(e=>e.setsStatus.every(s=>s.done));
  if(!confirm(allDone?'GG ! Enregistrer cette séance ?':'Terminer maintenant ? (tous les exos ne sont pas validés)'))return;
  clearInterval(activeTimerInterval);
  const session = {
    id:'s'+Date.now(),
    name:currentWorkout.name,
    date:new Date().toISOString(),
    duration:sessionSeconds,
    exercises:sessionExercises.length,
    exercisesList:sessionExercises.map(e=>({
      exoId:e.exoId,
      setsCompleted:e.setsStatus.filter(s=>s.done).length,
      totalSets:e.setsStatus.length
    }))
  };
  saveSessionToDb(session); // Firestore → déclenche onSnapshot → renderHistory() pour tous
  document.getElementById('active-bar').classList.remove('visible');
  closeModal('modal-session');
  currentWorkout=null;
}

function openActiveSession(){if(currentWorkout)openModal('modal-session');}
function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}

document.querySelectorAll('.modal-overlay').forEach(overlay=>{
  overlay.addEventListener('click',e=>{if(e.target!==overlay||overlay.id==='modal-session')return;closeModal(overlay.id);});
});

// ── AUTH ──
const AUTH_ERRORS = {
  'auth/email-already-in-use': 'Cet email est déjà utilisé.',
  'auth/invalid-email':        'Adresse email invalide.',
  'auth/weak-password':        'Mot de passe trop court (6 car. min).',
  'auth/invalid-credential':   'Email ou mot de passe incorrect.',
  'auth/user-not-found':       'Aucun compte avec cet email.',
  'auth/wrong-password':       'Mot de passe incorrect.',
};

function openAuth(mode = 'welcome') {
  const screen = document.getElementById('auth-screen');
  screen.classList.add('visible');
  ['welcome','signup','login','reset'].forEach(s => {
    document.getElementById(`auth-slide-${s}`).classList.toggle('auth-slide--hidden', s !== mode);
  });
  document.getElementById('auth-error-signup') && (document.getElementById('auth-error-signup').textContent = '');
  document.getElementById('auth-error-login')  && (document.getElementById('auth-error-login').textContent  = '');
}

function closeAuthScreen() {
  document.getElementById('auth-screen').classList.remove('visible');
}

function togglePwd(id, el) {
  const inp = document.getElementById(id);
  inp.type = inp.type === 'password' ? 'text' : 'password';
  el.style.color = inp.type === 'text' ? 'var(--accent)' : 'var(--muted)';
}

async function authSubmit(mode) {
  const errEl = document.getElementById(`auth-error-${mode}`);
  errEl.textContent = '';
  let email, password;
  if(mode === 'signup') {
    const name    = document.getElementById('auth-name').value.trim();
    email         = document.getElementById('auth-email').value.trim();
    password      = document.getElementById('auth-password').value;
    const confirm = document.getElementById('auth-confirm').value;
    if(!name || !email || !password) { errEl.textContent = 'Remplis tous les champs.'; return; }
    if(password !== confirm)         { errEl.textContent = 'Les mots de passe ne correspondent pas.'; return; }
  } else {
    email    = document.getElementById('auth-login-email').value.trim();
    password = document.getElementById('auth-login-password').value;
    if(!email || !password) { errEl.textContent = 'Remplis tous les champs.'; return; }
  }
  const btn = document.getElementById(mode === 'signup' ? 'auth-signup-btn' : null);
  try {
    if(mode === 'signup') {
      await createUserWithEmailAndPassword(auth, email, password);
      const subRef = doc(db, 'Subscriptions', email.toLowerCase());
      const existing = await getDoc(subRef);
      if (!existing.exists()) {
        await setDoc(subRef, { isPremium: false, email: email.toLowerCase(), createdAt: new Date().toISOString() });
      }
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
    closeAuthScreen();
  } catch(e) {
    errEl.textContent = AUTH_ERRORS[e.code] || 'Une erreur est survenue.';
  }
}

async function authGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    closeAuthScreen();
  } catch(e) {
    if (e.code !== 'auth/popup-closed-by-user') {
      alert(AUTH_ERRORS[e.code] || 'Erreur Google : ' + e.message);
    }
  }
}

async function authReset() {
  const email  = document.getElementById('auth-reset-email').value.trim();
  const errEl  = document.getElementById('auth-error-reset');
  const okEl   = document.getElementById('auth-success-reset');
  errEl.textContent = ''; okEl.textContent = '';
  if (!email) { errEl.textContent = 'Entre ton adresse email.'; return; }
  try {
    await sendPasswordResetEmail(auth, email);
    okEl.textContent = 'Email envoyé ! Vérifie ta boîte mail.';
    document.getElementById('auth-reset-email').value = '';
  } catch(e) {
    errEl.textContent = AUTH_ERRORS[e.code] || 'Une erreur est survenue.';
  }
}

async function authSignOut() {
  await signOut(auth);
  openAuth('welcome');
}

onAuthStateChanged(auth, async user => {
  const btn = document.getElementById('auth-header-btn');
  if(!btn) return;

  // Stoppe le listener historique précédent avant d'en créer un nouveau
  if (historyUnsub) { historyUnsub(); historyUnsub = null; }

  if(user && !user.isAnonymous) {
    const initials = (user.displayName || user.email || '?').slice(0,2).toUpperCase();
    btn.innerHTML = `<span class="auth-avatar">${initials}</span>`;
    btn.title = user.email || '';
    btn.onclick = () => { if(confirm(`Déconnexion de ${user.email} ?`)) authSignOut(); };
    closeAuthScreen();
    await loadPremiumStatus(user);
    historyUnsub = onSnapshot(query(historyCol, orderBy('date', 'desc')), (snap) => {
      sessionHistory = snap.docs.map(d => ({ ...d.data(), id: d.data().id || d.id }));
      renderHistory();
    });
  } else {
    premiumStatus = false;
    sessionHistory = [];
    renderHistory();
    if(!user) {
      btn.innerHTML = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
      btn.title = 'Connexion / Inscription';
      btn.onclick = () => openAuth('welcome');
      openAuth('welcome');
    }
  }
  renderGuidedPrograms();
});

// ── EXPOSITION GLOBALE (requis pour type="module") ──
// Les onclick="" dans le HTML ne voient pas les fonctions de module sans ça
Object.assign(window, {
  // Tabs & navigation
  switchTab, openActiveSession, openModal, closeModal,
  // Programmes
  openNewWorkout, editWorkout, deleteWorkout, saveWorkout, startSession,
  // Exercices
  filterExercices, filterMuscle, openExoPreview, openExoPreviewFromPicker, addExoFromPreview, closePreview, closePreviewBackToPicker,
  // Picker exercice
  switchToExoPickerMode, filterPickerExos, pickExo,
  // Sets
  removeWorkoutExo, addSet, removeSet, updateSet,
  // Session
  toggleSet, validateSet, undoSet, endSession,
  // Drag sections
  sectionDragStart,
  // Historique navigation & détail
  historyChangeDay, historySetDay, openSessionDetail, toggleSessionDetail,
  // PIN / reset
  pinInput, pinBackspace, resetAllHistory,
  // Programmes guidés
  openGuidedProgram, startGuidedSession, openExoFromGuided,
  // Auth
  openAuth, authSubmit, authSignOut, authReset, authGoogle, closeAuthScreen, togglePwd,
  // Stripe
  startCheckout, openCustomerPortal,
});

buildFilterChips();
loadWorkouts();
renderExercices();
renderGuidedPrograms();
