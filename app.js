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
  { id:'row',       name:'Tractions pronation',    emoji:'🦅', muscle:'Dos',             tags:['Grand dorsal','Biceps'],       gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Prise en pronation, largeur d\'épaules.' },
  { id:'chinup',    name:'Chin-ups',               emoji:'⬆️', muscle:'Dos',             tags:['Grand dorsal','Biceps'],       gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Prise en supination, isole les biceps.' },
  { id:'widepull',  name:'Tractions larges',       emoji:'🦅', muscle:'Dos',             tags:['Grand dorsal','V-taper'],      gif:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',         desc:'Prise large, maximise le dos en V.' },
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
];

const MUSCLE_ORDER = [
  'Pecs','Épaules','Triceps','Dos','Biceps',
  'Quadriceps','Fessiers','Ischio-jambiers','Mollets',
  'Abdominaux','Obliques','Gainage','Cardio'
];

const MUSCLE_EMOJI = {
  'Pecs':'🫀','Épaules':'🔵','Triceps':'💪','Dos':'🦅','Biceps':'💪',
  'Quadriceps':'🦵','Fessiers':'🍑','Ischio-jambiers':'🦵','Mollets':'🦿',
  'Abdominaux':'🔥','Obliques':'🌀','Gainage':'🧱','Cardio':'❤️'
};

const MUSCLE_FILTERS = [
  { label:'Tous',           value:'Tous' },
  { label:'🫀 Pecs',   value:'Pecs' },
  { label:'🔵 Épaules',    value:'Épaules' },
  { label:'💪 Triceps',    value:'Triceps' },
  { label:'🦅 Dos',        value:'Dos' },
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

const GIF_MAP = {
  'pu':       'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Push_up.gif/220px-Push_up.gif',
  'sq':       'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Squat_side_ani.gif/200px-Squat_side_ani.gif',
  'crunch':   'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Crunch_-_Anatomy.gif/200px-Crunch_-_Anatomy.gif',
  'burpee':   'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Burpee_-_animated_-_2019-09-19.gif/220px-Burpee_-_animated_-_2019-09-19.gif',
  'lunge':    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Lunge.gif/200px-Lunge.gif',
  'jj':       'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Jumping-Jacks.gif/200px-Jumping-Jacks.gif',
  'mntclimb': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Mountain-Climbers.gif/200px-Mountain-Climbers.gif',
  'highk':    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/High-Knees.gif/200px-High-Knees.gif',
};
function resolveGif(exo) { return GIF_MAP[exo.id] || exo.gif || null; }

// ── STATE ──
let workouts            = JSON.parse(localStorage.getItem('zw_workouts')        || '[]');
let sessionHistory      = JSON.parse(localStorage.getItem('zw_session_history') || '[]');
let currentWorkout      = null;
let sessionExercises    = [];
let sessionSeconds      = 0;
let activeTimerInterval = null;
let currentFilterMuscle = 'Tous';
let editingWorkoutId    = null;
let workoutExercises    = [];
let previewExoId        = null;

if (workouts.length === 0) {
  workouts = [
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
  save();
}

function save() {
  localStorage.setItem('zw_workouts',        JSON.stringify(workouts));
  localStorage.setItem('zw_session_history', JSON.stringify(sessionHistory));
}
function getExo(id) { return EXERCISES_DB.find(e => e.id === id); }
function fmtTime(sec) { return `${Math.floor(sec/60)}:${(sec%60).toString().padStart(2,'0')}`; }

// ── MUSCLE IMAGE MAP — Wikipedia anatomy images (public domain) ──
const MUSCLE_IMG = {
  'Tous':            null,
  'Pecs':            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Pectoralis_major_muscle_front.png/120px-Pectoralis_major_muscle_front.png',
  'Épaules':         'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Deltoid_muscle_top.png/120px-Deltoid_muscle_top.png',
  'Triceps':         'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Triceps_brachii_muscle09.png/120px-Triceps_brachii_muscle09.png',
  'Dos':             'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Latissimus_dorsi_muscle_back3.png/120px-Latissimus_dorsi_muscle_back3.png',
  'Biceps':          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Biceps_brachii_muscle_biceps.png/120px-Biceps_brachii_muscle_biceps.png',
  'Quadriceps':      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Quadriceps_muscle.png/120px-Quadriceps_muscle.png',
  'Fessiers':        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Gluteus_maximus_muscle.png/120px-Gluteus_maximus_muscle.png',
  'Ischio-jambiers': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Biceps_femoris_muscle.png/120px-Biceps_femoris_muscle.png',
  'Mollets':         'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Gastrocnemius_muscle_-_lateral_head.png/120px-Gastrocnemius_muscle_-_lateral_head.png',
  'Abdominaux':      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Rectus_abdominis.png/120px-Rectus_abdominis.png',
  'Obliques':        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/External_oblique_muscle.png/120px-External_oblique_muscle.png',
  'Gainage':         'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Transversus_abdominis_muscle.png/120px-Transversus_abdominis_muscle.png',
  'Cardio':          null,
};

// ── CHIP EMOJI fallback ──
const CHIP_EMOJI = {
  'Tous':'🏋️','Cardio':'❤️','Gainage':'🧱',
};

// ── Chip drag state ──
let draggedChip = null;
let chipOrder   = [];

// ── BUILD CHIPS ──
function buildFilterChips() {
  chipOrder = MUSCLE_FILTERS.map(f => f.value);
  renderChips();
}

function renderChips() {
  const container = document.getElementById('muscle-filter-chips');
  container.innerHTML = chipOrder.map((val, i) => {
    const f   = MUSCLE_FILTERS.find(x => x.value === val);
    if (!f) return '';
    const img = MUSCLE_IMG[val];
    const emoji = CHIP_EMOJI[val] || MUSCLE_EMOJI[val] || '💪';
    const isAll = val === 'Tous';
    const active = val === currentFilterMuscle;
    return `<div class="muscle-chip${active?' active':''}${isAll?' chip-all':''}"
                 data-muscle="${val}"
                 draggable="true"
                 onclick="filterMuscle('${val}', this)"
                 ondragstart="chipDragStart(event,'${val}')"
                 ondragover="chipDragOver(event,'${val}')"
                 ondrop="chipDrop(event,'${val}')"
                 ondragend="chipDragEnd(event)">
      <div class="chip-img-wrap">
        ${img
          ? `<img src="${img}" alt="${f.label}" loading="lazy" onerror="this.style.display='none';this.nextSibling.style.display='flex'">
             <span class="chip-emoji" style="display:none">${emoji}</span>`
          : `<span class="chip-emoji">${emoji}</span>`}
      </div>
      <div class="chip-label">${val}</div>
    </div>`;
  }).join('');
}

function chipDragStart(event, muscle) {
  draggedChip = muscle;
  event.dataTransfer.effectAllowed = 'move';
  setTimeout(() => {
    const el = document.querySelector(`.muscle-chip[data-muscle="${muscle}"]`);
    if (el) el.classList.add('dragging-chip');
  }, 0);
}
function chipDragOver(event, muscle) {
  event.preventDefault();
  if (muscle === draggedChip) return;
  document.querySelectorAll('.muscle-chip').forEach(c => c.classList.remove('drag-over-chip'));
  const el = document.querySelector(`.muscle-chip[data-muscle="${muscle}"]`);
  if (el) el.classList.add('drag-over-chip');
  // Reorder
  const from = chipOrder.indexOf(draggedChip);
  const to   = chipOrder.indexOf(muscle);
  if (from < 0 || to < 0) return;
  chipOrder.splice(from, 1);
  chipOrder.splice(to, 0, draggedChip);
  renderChips();
}
function chipDrop(event, muscle) { event.preventDefault(); }
function chipDragEnd(event) {
  draggedChip = null;
  document.querySelectorAll('.muscle-chip').forEach(c => {
    c.classList.remove('dragging-chip');
    c.classList.remove('drag-over-chip');
  });
}

// ── PREVIEW ──
function openExoPreview(exoId) {
  previewExoId = exoId;
  const ex = getExo(exoId); if (!ex) return;
  const gif = resolveGif(ex);
  document.getElementById('preview-title').textContent  = ex.name;
  document.getElementById('preview-desc').textContent   = ex.desc || '';
  document.getElementById('preview-muscle').textContent = ex.muscle;
  document.getElementById('preview-tags').innerHTML     = ex.tags.map(t=>`<span class="exo-tag">${t}</span>`).join('');
  const gifEl = document.getElementById('preview-gif');
  const gifWrap = document.getElementById('preview-gif-wrap');
  if (gif) {
    gifEl.src = gif; gifEl.style.display='block'; gifWrap.style.display='flex';
    gifEl.onload  = () => gifWrap.classList.remove('loading');
    gifEl.onerror = () => { gifWrap.style.display='none'; };
    gifWrap.classList.add('loading');
  } else { gifWrap.style.display='none'; }
  openModal('modal-preview');
}
function addExoFromPreview() {
  if (previewExoId && !workoutExercises.some(we=>we.exoId===previewExoId))
    workoutExercises.push({ exoId:previewExoId, sets:[{reps:10},{reps:10},{reps:10}] });
  closeModal('modal-preview'); renderWorkoutExoPicker(); openModal('modal-workout');
}

// ── RENDER PROGRAMMES ──
function renderWorkouts() {
  const list = document.getElementById('workout-list');
  if (!workouts.length) { list.innerHTML=`<div class="empty-state"><div class="big-icon">🏋️</div><p>Aucun programme.<br>Crée ton premier entraînement !</p></div>`; return; }
  list.innerHTML = workouts.map(w => {
    const exos = w.exercises||[];
    const preview = exos.slice(0,3).map(e=>{const ex=getExo(e.exoId);return ex?`<div class="exo-preview"><span class="exo-preview-name">${ex.emoji} ${ex.name}</span><span class="exo-preview-sets">${e.sets.length} série${e.sets.length>1?'s':''}</span></div>`:''}).join('');
    const more = exos.length>3?`<div class="exo-more">+${exos.length-3} exercice${exos.length-3>1?'s':''}</div>`:'';
    return `<div class="workout-card" style="margin-bottom:14px">
      <div class="workout-card-header">
        <div class="workout-name">${w.name}</div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
          <div class="workout-badge">${exos.length} exo${exos.length>1?'s':''}</div>
          <div style="display:flex;gap:6px">
            <div class="icon-btn" style="width:28px;height:28px;border-radius:7px" onclick="event.stopPropagation();editWorkout('${w.id}')">
              <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </div>
            <div class="icon-btn" style="width:28px;height:28px;border-radius:7px;background:rgba(255,79,106,.1);border-color:rgba(255,79,106,.2);color:#ff4f6a" onclick="event.stopPropagation();deleteWorkout('${w.id}')">
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
      <div style="padding:12px 18px 18px"><button class="start-btn" onclick="startSession('${w.id}')">▶ DÉMARRER</button></div>
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
    return `
    <div class="muscle-section" id="section-${muscle.replace(/[^a-zA-Z]/g,'')}"
         draggable="true"
         ondragstart="dragSection(event,'${muscle}')"
         ondragover="dragOverSection(event,'${muscle}')"
         ondragend="dragEndSection(event)"
         ondrop="dropSection(event,'${muscle}')">
      <div class="muscle-group-header">
        <span class="drag-handle" title="Glisser pour réorganiser">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="5" r="1.2" fill="currentColor"/><circle cx="9" cy="12" r="1.2" fill="currentColor"/><circle cx="9" cy="19" r="1.2" fill="currentColor"/><circle cx="15" cy="5" r="1.2" fill="currentColor"/><circle cx="15" cy="12" r="1.2" fill="currentColor"/><circle cx="15" cy="19" r="1.2" fill="currentColor"/></svg>
        </span>
        <span class="muscle-group-emoji">${MUSCLE_EMOJI[muscle]||'💪'}</span>
        <span class="muscle-group-name">${muscle}</span>
        <span class="muscle-group-count">${exos.length}</span>
      </div>
      ${exos.map(e=>{
        const gif=resolveGif(e);
        return `<div class="exo-item" onclick="openExoPreview('${e.id}')">
          <div class="exo-icon-wrap" onmouseenter="showGifHover(this,'${gif||''}')" onmouseleave="hideGifHover(this)">
            ${gif
              ? `<img src="${gif}" class="exo-thumb exo-thumb-static" loading="lazy" onerror="this.style.display='none';this.nextSibling.style.display='flex'">
                 <div class="exo-icon" style="display:none">${e.emoji}</div>
                 <div class="gif-hover-overlay"></div>`
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

// ── HOVER GIF ──
function showGifHover(wrap, gifUrl) {
  if (!gifUrl) return;
  const overlay = wrap.querySelector('.gif-hover-overlay');
  const staticImg = wrap.querySelector('.exo-thumb-static');
  if (!overlay || !staticImg) return;
  // Load animated gif into overlay as background
  overlay.style.backgroundImage = `url('${gifUrl}')`;
  overlay.classList.add('visible');
  staticImg.style.filter = 'blur(2px) brightness(.4)';
}
function hideGifHover(wrap) {
  const overlay = wrap.querySelector('.gif-hover-overlay');
  const staticImg = wrap.querySelector('.exo-thumb-static');
  if (!overlay || !staticImg) return;
  overlay.classList.remove('visible');
  staticImg.style.filter = '';
}

// ── DRAG & DROP muscle sections ──
let draggedMuscle = null;
let muscleOrder   = [...MUSCLE_ORDER];

function updateSectionOrder(order) {
  muscleOrder = order;
}

function dragSection(event, muscle) {
  draggedMuscle = muscle;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', muscle);
  setTimeout(() => {
    const el = document.getElementById('section-' + muscle.replace(/[^a-zA-Z]/g,''));
    if (el) el.classList.add('dragging');
  }, 0);
}

function dragOverSection(event, muscle) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  if (muscle === draggedMuscle) return;
  const list = document.getElementById('exo-list');
  const sections = [...list.querySelectorAll('.muscle-section')];
  const fromEl = sections.find(s => s.id === 'section-' + draggedMuscle.replace(/[^a-zA-Z]/g,''));
  const toEl   = sections.find(s => s.id === 'section-' + muscle.replace(/[^a-zA-Z]/g,''));
  if (!fromEl || !toEl) return;
  // Insert before or after depending on position
  const toRect   = toEl.getBoundingClientRect();
  const midY     = toRect.top + toRect.height / 2;
  if (event.clientY < midY) {
    list.insertBefore(fromEl, toEl);
  } else {
    list.insertBefore(fromEl, toEl.nextSibling);
  }
}

function dragEndSection(event) {
  draggedMuscle = null;
  document.querySelectorAll('.muscle-section').forEach(s => s.classList.remove('dragging'));
}

function dropSection(event, muscle) {
  event.preventDefault();
}

function filterExercices(val) { renderExercices(currentFilterMuscle, val); }
function filterMuscle(muscle) {
  currentFilterMuscle = muscle;
  renderChips();
  renderExercices(muscle, document.getElementById('exo-search').value);
}

// ── HISTORY ──
function renderHistory() {
  const sessions=sessionHistory.slice().reverse();
  document.getElementById('stat-sessions').textContent=sessions.filter(s=>new Date(s.date).getMonth()===new Date().getMonth()).length;
  let streak=0; const today=new Date(); today.setHours(0,0,0,0);
  for(let i=0;i<30;i++){const d=new Date(today);d.setDate(d.getDate()-i);if(sessions.some(s=>new Date(s.date).toDateString()===d.toDateString()))streak++;else if(i>0)break;}
  document.getElementById('stat-streak').innerHTML=`${streak}<span>j</span>`;
  const days=['L','M','M','J','V','S','D'];
  document.getElementById('streak-row').innerHTML=Array.from({length:7},(_,i)=>{
    const d=new Date(today);d.setDate(d.getDate()-(6-i));
    const done=sessions.some(s=>new Date(s.date).toDateString()===d.toDateString());
    const isToday=d.toDateString()===today.toDateString();
    return `<div class="streak-day${done?' done':''}${isToday&&!done?' today':''}">${days[d.getDay()===0?6:d.getDay()-1]}</div>`;
  }).join('');
  const hl=document.getElementById('history-list');
  if(!sessions.length){hl.innerHTML=`<div class="empty-state"><div class="big-icon">📋</div><p>Aucune séance terminée.<br>Lance ton premier entraînement !</p></div>`;return;}
  hl.innerHTML=sessions.slice(0,20).map(s=>{
    const d=new Date(s.date);
    return `<div class="history-item"><div class="history-dot"></div><div class="history-info"><div class="history-name">${s.name}</div><div class="history-date">${d.toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'short'})} · ${s.exercises} exercices</div></div><div class="history-duration">${Math.floor(s.duration/60)}min</div></div>`;
  }).join('');
}

// ── TABS ──
function switchTab(id, btn) {
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('view-'+id).classList.add('active'); btn.classList.add('active');
  if(id==='exercices')  renderExercices(currentFilterMuscle);
  if(id==='historique') renderHistory();
}

// ── WORKOUT MODAL ──
function openNewWorkout(){editingWorkoutId=null;workoutExercises=[];document.getElementById('input-workout-name').value='';document.getElementById('input-workout-days').value='';document.getElementById('input-workout-duration').value='';document.getElementById('modal-workout-title').textContent='NOUVEAU PROGRAMME';renderWorkoutExoPicker();openModal('modal-workout');}
function editWorkout(id){const w=workouts.find(x=>x.id===id);if(!w)return;editingWorkoutId=id;workoutExercises=w.exercises.map(e=>({exoId:e.exoId,sets:e.sets.map(s=>({...s}))}));document.getElementById('input-workout-name').value=w.name;document.getElementById('input-workout-days').value=w.days;document.getElementById('input-workout-duration').value=w.duration;document.getElementById('modal-workout-title').textContent='MODIFIER LE PROGRAMME';renderWorkoutExoPicker();openModal('modal-workout');}
function deleteWorkout(id){if(!confirm('Supprimer ce programme ?'))return;workouts=workouts.filter(w=>w.id!==id);save();renderWorkouts();}

function renderWorkoutExoPicker() {
  const c=document.getElementById('workout-exo-picker');
  if(!workoutExercises.length){c.innerHTML='';return;}
  c.innerHTML=workoutExercises.map((we,i)=>{
    const ex=getExo(we.exoId);if(!ex)return'';
    return `<div style="background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:12px 14px;margin-bottom:8px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
        <span style="font-size:18px">${ex.emoji}</span>
        <div style="flex:1"><div style="font-size:14px;font-weight:500;color:var(--text)">${ex.name}</div><div style="font-size:11px;color:var(--muted);margin-top:2px">${ex.muscle}</div></div>
        <button class="set-remove" onclick="removeWorkoutExo(${i})"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
      </div>
      <div class="sets-editor">${we.sets.map((s,si)=>`
        <div class="set-row">
          <div class="set-num">${si+1}</div>
          <input class="set-input" type="number" value="${s.reps}" placeholder="10" onchange="updateSet(${i},${si},this.value)" style="max-width:60px">
          <div class="set-label">${ex.name.toLowerCase().includes('planche')?'sec':'reps'}</div>
          <button class="set-remove" onclick="removeSet(${i},${si})"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
        </div>`).join('')}</div>
      <button class="add-set-btn" style="margin-top:8px" onclick="addSet(${i})">
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Ajouter une série
      </button>
    </div>`;
  }).join('');
}
function removeWorkoutExo(i){workoutExercises.splice(i,1);renderWorkoutExoPicker();}
function addSet(i){const l=workoutExercises[i].sets.slice(-1)[0];workoutExercises[i].sets.push({reps:l?l.reps:10});renderWorkoutExoPicker();}
function removeSet(i,si){if(workoutExercises[i].sets.length<=1)return;workoutExercises[i].sets.splice(si,1);renderWorkoutExoPicker();}
function updateSet(i,si,val){workoutExercises[i].sets[si].reps=parseInt(val)||10;}

function saveWorkout(){
  const name=document.getElementById('input-workout-name').value.trim();
  const days=parseInt(document.getElementById('input-workout-days').value)||3;
  const duration=parseInt(document.getElementById('input-workout-duration').value)||40;
  if(!name){alert('Donne un nom au programme !');return;}
  if(!workoutExercises.length){alert('Ajoute au moins un exercice !');return;}
  if(editingWorkoutId){const idx=workouts.findIndex(w=>w.id===editingWorkoutId);if(idx>=0)workouts[idx]={id:editingWorkoutId,name,days,duration,exercises:workoutExercises};}
  else workouts.push({id:'w'+Date.now(),name,days,duration,exercises:workoutExercises});
  save();renderWorkouts();closeModal('modal-workout');
}

// ── EXO PICKER ──
function switchToExoPickerMode(){closeModal('modal-workout');renderPickerExos('');document.getElementById('picker-search').value='';openModal('modal-exo-picker');}
function renderPickerExos(search){
  let f=EXERCISES_DB;
  if(search) f=f.filter(e=>e.name.toLowerCase().includes(search.toLowerCase())||e.muscle.toLowerCase().includes(search.toLowerCase()));
  const groups=buildGroups(f);
  document.getElementById('picker-exo-list').innerHTML=Object.entries(groups).filter(([,exos])=>exos.length>0).map(([muscle,exos])=>`
    <div class="muscle-group-header">
      <span class="muscle-group-emoji">${MUSCLE_EMOJI[muscle]||'💪'}</span>
      <span class="muscle-group-name">${muscle}</span>
    </div>
    ${exos.map(e=>{
      const already=workoutExercises.some(we=>we.exoId===e.id);
      const gif=resolveGif(e);
      return `<div class="exo-item${already?' exo-already':''}" onclick="${already?'':` pickExo('${e.id}')`}" style="${already?'opacity:.5;pointer-events:none':''}">
        <div class="exo-icon-wrap">
          ${gif?`<img src="${gif}" class="exo-thumb" loading="lazy" onerror="this.style.display='none';this.nextSibling.style.display='flex'"><div class="exo-icon" style="display:none">${e.emoji}</div>`:`<div class="exo-icon">${e.emoji}</div>`}
        </div>
        <div class="exo-info"><div class="exo-name">${e.name}</div><div class="exo-tags">${e.tags.slice(0,2).map(t=>`<span class="exo-tag">${t}</span>`).join('')}</div></div>
        ${already?`<span style="color:var(--success);font-size:12px;font-weight:700;flex-shrink:0">✓</span>`:`<div class="exo-add-btn" style="flex-shrink:0"><svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></div>`}
      </div>`;
    }).join('')}
  `).join('');
}
function filterPickerExos(val){renderPickerExos(val);}
function pickExo(id){if(!workoutExercises.some(we=>we.exoId===id))workoutExercises.push({exoId:id,sets:[{reps:10},{reps:10},{reps:10}]});closeModal('modal-exo-picker');renderWorkoutExoPicker();openModal('modal-workout');}

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
  const allDoneGlobal=done===total&&total>0;
  document.getElementById('session-exo-list').innerHTML=
    sessionExercises.map((we,i)=>{
      const ex=getExo(we.exoId);if(!ex)return'';
      const allDone=we.setsStatus.every(s=>s.done);
      const gif=resolveGif(ex);
      return `<div style="background:var(--surface2);border:1px solid ${allDone?'rgba(61,232,160,.25)':'var(--border)'};border-radius:14px;padding:14px 16px;margin-bottom:12px;${allDone?'opacity:.65':''}">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
          ${gif?`<img src="${gif}" style="width:44px;height:44px;border-radius:10px;object-fit:cover;flex-shrink:0" loading="lazy" onerror="this.style.display='none'">`:` <span style="font-size:20px">${ex.emoji}</span>`}
          <div style="flex:1"><div style="font-size:15px;font-weight:600;color:var(--text)">${ex.name}</div><div style="font-size:11px;color:var(--muted);margin-top:2px">${ex.muscle}</div></div>
          ${allDone?`<span style="color:var(--success);font-size:11px;font-weight:700">✓ FAIT</span>`:''}
        </div>
        <div style="display:flex;flex-direction:column;gap:6px">
          ${we.setsStatus.map((s,si)=>`
          <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg);border-radius:10px;border:1px solid ${s.done?'rgba(61,232,160,.2)':'var(--border)'}">
            <div style="font-family:'Bebas Neue',sans-serif;font-size:16px;color:var(--accent);width:20px;flex-shrink:0">${si+1}</div>
            <div style="flex:1;font-size:13px;color:${s.done?'var(--muted)':'var(--text)'}">${s.reps} reps</div>
            <button onclick="toggleSet(${i},${si})" style="padding:6px 16px;border-radius:8px;border:1px solid ${s.done?'var(--success)':'var(--border2)'};background:${s.done?'rgba(61,232,160,.1)':'var(--surface3)'};color:${s.done?'var(--success)':'var(--muted)'};cursor:pointer;font-size:12px;font-weight:700;font-family:'DM Sans',sans-serif;transition:all .15s">
              ${s.done?'✓ OK':'Valider'}
            </button>
          </div>`).join('')}
        </div>
      </div>`;
    }).join('')+
    `<button class="btn-end-session ${allDoneGlobal?'all-done':''}" onclick="endSession()">
      ${allDoneGlobal?'🏆 SÉANCE TERMINÉE !':'⏹ TERMINER LA SÉANCE'}
    </button>`;
}

function toggleSet(exoI,setI){sessionExercises[exoI].setsStatus[setI].done=!sessionExercises[exoI].setsStatus[setI].done;renderSession();updateSessionProgress();}
function updateSessionProgress(){
  const total=sessionExercises.length;
  const done=sessionExercises.filter(e=>e.setsStatus.every(s=>s.done)).length;
  document.getElementById('session-progress').textContent=`${done}/${total} exercices`;
  const bar=document.getElementById('session-progress-bar');
  if(bar)bar.style.width=(total?Math.round(done/total*100):0)+'%';
}
function endSession(){
  const allDone=sessionExercises.every(e=>e.setsStatus.every(s=>s.done));
  if(!confirm(allDone?'💪 GG ! Enregistrer cette séance ?':'Terminer maintenant ? (tous les exos ne sont pas validés)'))return;
  clearInterval(activeTimerInterval);
  sessionHistory.push({id:'s'+Date.now(),name:currentWorkout.name,date:new Date().toISOString(),duration:sessionSeconds,exercises:sessionExercises.length});
  save();document.getElementById('active-bar').classList.remove('visible');closeModal('modal-session');currentWorkout=null;renderHistory();
}

function openActiveSession(){if(currentWorkout)openModal('modal-session');}
function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}

document.querySelectorAll('.modal-overlay').forEach(overlay=>{
  overlay.addEventListener('click',e=>{if(e.target!==overlay||overlay.id==='modal-session')return;closeModal(overlay.id);});
});

buildFilterChips();
renderWorkouts();
renderExercices();
