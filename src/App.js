import React, { useState, useEffect, useRef } from 'react';
import "./App.css";

function App() {
  const slides = [
    {
      image: "tanjiro.png",
      title: "Tanjiro Kamado",
      description: "A kind-hearted boy who became a demon slayer to save his sister and avenge his family.",
      funFact: "Tanjiro has an exceptional sense of smell, allowing him to detect demons and sense emotions.",
      role: "Main Protagonist",
      genres: ["Action, ", "Adventure, ", "Supernatural"]
    },
    {
      image: "Zenitsu.png",
      title: "Zenitsu Agatsuma",
      description: "A cowardly demon slayer with incredible lightning-fast abilities.",
      funFact: "Zenitsu can only use one form of Thunder Breathing, but he has mastered it to perfection.",
      role: "Support Character",
      genres: ["Action, ", "Adventure, ", "Comedy"]
    },
    {
      image: "nezuko.png",
      title: "Nezuko Kamado",
      description: "Tanjiro's sister who transformed into a demon but retains her humanity.",
      funFact: "Nezuko can shrink and grow in size, making her a versatile fighter.",
      role: "Deuteragonist",
      genres: ["Action, ", "Adventure, ", "Supernatural"]
    },
    {
      image: "inosuke.png",
      title: "Inosuke Hashibira",
      description: "A wild and headstrong demon slayer who wears a boar mask.",
      funFact: "Inosuke was raised by boars, which explains his wild and animalistic behavior.",
      role: "Comic Relief / Fighter",
      genres: ["Action, ", "Adventure, ", "Comedy"]
    },
    {
      image: "group.png",
      title: "The Team",
      description: "The team of demon slayers working together to defeat evil.",
      funFact: "Despite their differences, the team shares a strong bond built on trust and loyalty.",
      role: "Team Unity",
      genres: ["Action, ", "Adventure"]
    },
    {
      image: "https://4kwallpapers.com/images/wallpapers/demon-slayer-2048x2048-10716.jpg",
      title: "Demon Slayer",
      description: "A story of Tanjiro Kamado's journey to avenge his family and protect his sister.",
      funFact: "Demon Slayer has become a global phenomenon with stunning animation and powerful storytelling.",
      role: "Anime",
      genres: ["Action", "Adventure", "Supernatural"]
    },
    {
      image: "https://i.pinimg.com/736x/e4/64/75/e464758d26a1cd32a216404e5bc02a11.jpg",
      title: "Naruto",
      description: "Naruto Uzumaki dreams of becoming Hokage while overcoming challenges in his ninja journey.",
      funFact: "Naruto's iconic 'Believe It!' catchphrase is a localized addition.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Ninja"]
    },
    {
      image: "https://m.media-amazon.com/images/I/51SBAEcsd5L._AC_SY780_.jpg",
      title: "Dragon Ball Super",
      description: "Goku and his friends face gods, warriors, and universal threats.",
      funFact: "Dragon Ball Super introduced the concept of the multiverse.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcxa0rE1NVifoHRlKhLr1cL9nwCPzbI5vhdA&s",
      title: "Bleach",
      description: "Ichigo Kurosaki becomes a Soul Reaper to protect the living and the dead.",
      funFact: "Bleach's 'Bankai' transformations became a hallmark of the series.",
      role: "Anime Series",
      genres: ["Action", "Supernatural", "Fantasy"]
    },
    {
      image: "https://pbs.twimg.com/media/E2yWCgMUYAAnN-C.jpg:large",
      title: "My Hero Academia",
      description: "Izuku Midoriya trains to become the world’s greatest hero in a world full of superpowers.",
      funFact: "Each character’s quirks were inspired by real-world abilities.",
      role: "Anime Series",
      genres: ["Action", "Superhero", "Adventure"]
    },
    {
      image: "https://i.pinimg.com/736x/02/b3/24/02b324fedd5e913d0af16c0f325346ba.jpg",
      title: "Jujutsu Kaisen",
      description: "Yuji Itadori battles curses to protect the world while seeking to master cursed energy.",
      funFact: "Jujutsu Kaisen’s fight choreography is widely acclaimed.",
      role: "Anime Series",
      genres: ["Action", "Supernatural", "Fantasy"]
    },
    {
      image: "https://m.media-amazon.com/images/I/81cUBwUTL+L.jpg",
      title: "Dandadan",
      description: "An exciting mix of supernatural battles and heartfelt stories.",
      funFact: "Dandadan combines alien invasions and ghost hunting.",
      role: "Manga Series",
      genres: ["Action", "Supernatural", "Comedy"]
    },
    {
      image: "https://i.pinimg.com/originals/33/f4/ac/33f4ace132a4031fe8fcadfa1feb62cc.png",
      title: "Black Clover",
      description: "Asta, a boy without magic, seeks to become the Wizard King in a magical world.",
      funFact: "Black Clover's battles are praised for their intensity and visuals.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://i.pinimg.com/236x/f6/2b/f2/f62bf22f2b9966c24d861082088241d4.jpg",
      title: "Zatch Bell",
      description: "Zatch Bell is an adventure anime that follows the story of Kiyomaro Takamine, a young boy who teams up with a magical creature named Zatch Bell to fight against other 'mamodo' (demon) children in a battle to become the king of the demon world.",
      funFact: "This anime has inspired millions worldwide, especially with its unique combination of adventure, humor, and heartwarming moments.",
      role: "Anime Series",
      genres: ["Adventure", "Action", "Comedy"]
    },
    {
      image: "https://i.pinimg.com/474x/d5/a6/82/d5a682f0ede4715f4369add71a1a0f37.jpg",
      title: "Idaten Jump",
      description: "Idaten Jump follows a group of mountain bikers who participate in competitive races. The anime focuses on the protagonist, a young boy named Sho, who is passionate about racing and conquering the most challenging courses.",
      funFact: "It broke records for its animation budget, offering some of the most detailed racing scenes of its time.",
      role: "Anime Series",
      genres: ["Adventure", "Sports", "Action"]
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BM2YwNDdjOTktZjY2Yy00NTcxLWEzOTMtMGFlMTdlMzljNTdiXkEyXkFqcGc@._V1_.jpg",
      title: "Death March kara",
      description: "Death March kara, or 'Death March to the Parallel World Rhapsody,' is a fantasy anime that follows the protagonist, Ichiro Suzuki, a programmer who is transported to a fantasy world while on a 'death march' in his game development project. He uses his knowledge of the game world to survive.",
      funFact: "This series has a massive fan following in Japan and internationally, with its unique isekai (another world) concept.",
      role: "Anime Series",
      genres: ["Fantasy", "Adventure", "Isekai"]
    },
    {
      image: "https://images-cdn.ubuy.co.in/64f37d4a98be9872ad589ee7-poster-stop-online-one-punch-man-anime.jpg",
      title: "One Punch Man",
      description: "One Punch Man is a parody of traditional superhero and shonen anime. It follows Saitama, a hero who can defeat any opponent with a single punch. Bored with his strength, Saitama searches for a worthy adversary.",
      funFact: "The protagonist was inspired by a real-life person, a man who wanted to create a hero that could defeat any foe easily.",
      role: "Anime Series",
      genres: ["Action", "Comedy", "Superhero"]
    },
    {
      image: "https://s1.zerochan.net/Sword.Art.Online%3A.Alicization.Lycoris.600.2532438.jpg",
      title: "Sword Art Online",
      description: "Sword Art Online is a pioneering anime in the 'virtual reality' genre. The story follows Kirito, a player trapped in a virtual MMORPG. He must clear the game's dungeons to escape, but the stakes are life and death.",
      funFact: "Sword Art Online has been highly influential in shaping modern isekai anime.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Isekai"]
    },
    {
      image: "https://static.tvtropes.org/pmwiki/pub/images/fairy_tail_2020_visual_5.jpg",
      title: "Fairy Tail",
      description: "Fairy Tail is a magical adventure anime that follows the story of Natsu Dragneel and his friends in the Fairy Tail guild. They embark on quests, battle dark guilds, and grow stronger while making deep bonds with each other.",
      funFact: "Fairy Tail was serialized for over a decade and became one of the most iconic shonen anime series of its time.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://m.media-amazon.com/images/I/81Uu-Z2zYhL._AC_UF1000,1000_QL80_.jpg",
      title: "Seven Deadly Sins",
      description: "Seven Deadly Sins is a fantasy anime centered around Meliodas and his group of knights, each embodying one of the Seven Deadly Sins. They must protect the kingdom of Liones from various threats, including demons and corrupt rulers.",
      funFact: "The series features groundbreaking animation techniques, especially during fight scenes, that made it a fan favorite.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13924524_b_v13_ab.jpg",
      title: "Mob Psycho 100",
      description: "Mob Psycho 100 is a unique blend of comedy, action, and psychology. It tells the story of Shigeo Kageyama (Mob), a high school student with psychic powers. Mob struggles to balance his psychic abilities with his desire to lead a normal life.",
      funFact: "This anime’s art style is considered a masterpiece, especially with its distinct animation during fight sequences.",
      role: "Anime Series",
      genres: ["Comedy", "Action", "Supernatural"]
    },
    {
      image: "https://i.pinimg.com/736x/5f/c9/6e/5fc96ebf2a2ecb34162655417f0fae2b.jpg",
      title: "Charlotte",
      description: "Charlotte follows a group of teenagers who possess unique abilities. The story focuses on Yuu Otosaka, who uses his power to possess others' bodies for five seconds at a time, until a mysterious girl named Nao Tomori shows up.",
      funFact: "The protagonist's journey was inspired by a myth involving the ability to control time.",
      role: "Anime Series",
      genres: ["Drama", "Supernatural", "Psychological"]
    },
    {
      image: "https://www.animenewsnetwork.com/images/encyc/A20672-1892448872.1548292732.jpg",
      title: "Goblin Slayer",
      description: "Goblin Slayer is a dark fantasy anime that follows the story of a lone warrior known as the Goblin Slayer, who dedicates his life to hunting down goblins after witnessing the destruction they caused to his village.",
      funFact: "It took over five years to complete this series, and it quickly gained a cult following for its mature themes.",
      role: "Anime Series",
      genres: ["Action", "Fantasy", "Dark"]
    },
    {
      image: "https://i.pinimg.com/736x/3f/06/23/3f06237b631eb8c499ba638b888c1081.jpg",
      title: "Hunter X Hunter",
      description: "Hunter X Hunter follows Gon Freecss, a young boy who learns that his father, who he thought was dead, is actually a legendary Hunter. Gon embarks on an adventure to find his father and become a Hunter.",
      funFact: "The main character was voiced by a famous actor, and the anime is known for its deep character development and complex storylines.",
      role: "Anime Series",
      genres: ["Adventure", "Action", "Fantasy"]
    },
    {
      image: "https://preview.redd.it/is-overlord-worth-watching-v0-28dbcl9w6y2e1.png?width=640&crop=smart&auto=webp&s=0ec7fe81831615000ed2e4c156278756d0d1164c",
      title: "Overlord",
      description: "Overlord follows the story of Suzuki Satoru, a player who becomes trapped in a virtual MMORPG as his character, an undead overlord. As the game world becomes his reality, Satoru begins to rule over its inhabitants and seeks to conquer the unknown world.",
      funFact: "Overlord’s world-building is highly praised, with a vast and detailed fantasy world that immerses viewers.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://i.pinimg.com/736x/5d/7b/6b/5d7b6bae747ef1994f00bb52bf5f6ca9.jpg",
      title: "That Time I Got Reincarnated as a Slime",
      description: "That Time I Got Reincarnated as a Slime follows Satoru Mikami, a man who is reincarnated as a slime in a fantasy world. He gains powerful abilities and sets out to form a peaceful society with the monsters around him.",
      funFact: "The series was adapted from a popular light novel and became a hit due to its blend of comedy, action, and heartwarming moments.",
      role: "Anime Series",
      genres: ["Comedy", "Adventure", "Fantasy"]
    },
    {
      image: "https://i.pinimg.com/736x/69/c9/45/69c945b373dd418c1363ce621574c100.jpg",
      title: "Kiss X Sis",
      description: "Kiss X Sis follows Keita Suminoe, a high school student who finds himself in an unusual situation when his two stepsisters, Ako and Riko, develop romantic feelings for him.",
      funFact: "The series is known for its controversial themes and has been classified as an ecchi anime, with a mix of comedy, romance, and fan service.",
      role: "Anime Series",
      genres: ["Romance", "Ecchi", "Comedy"]
    },
    {
      image: "https://images.justwatch.com/poster/240115772/s718/the-testament-of-sister-new-devil.jpg",
      title: "The Testament of Sister New Devil",
      description: "The Testament of Sister New Devil follows Basara Tojo, a young man who is suddenly tasked with protecting two demon girls after his father marries their mother.",
      funFact: "This series is known for its action-packed scenes and supernatural themes combined with harem elements.",
      role: "Anime Series",
      genres: ["Action", "Fantasy", "Supernatural"]
    },
    {
      image: "https://cdn.myanimelist.net/s/common/uploaded_files/1655136392-483e85ac8a212937d95b1da17ff089f6.jpeg",
      title: "Harem in the Labyrinth of Another World",
      description: "Harem in the Labyrinth of Another World follows Michio Kaga, who is transported to a fantasy world and discovers that he has the ability to create a harem while navigating through a dangerous labyrinth filled with monsters and magic.",
      funFact: "The series features themes of adventure, romance, and harem, and explores the protagonist's journey in both the labyrinth and his relationships with the women he meets.",
      role: "Anime Series",
      genres: ["Adventure", "Fantasy", "Romance"]
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BYTY3MWFmMWQtYWViYS00MzBlLWJmYWQtODZlNTJkYjRiZTZkXkEyXkFqcGc@._V1_.jpg",
      title: "Redo of Healer",
      description: "Redo of Healer follows Keyaru, a healer who uses his healing powers to undo the traumas of his past life and seek revenge on those who wronged him.",
      funFact: "This controversial series has received mixed reactions due to its mature and explicit content, which explores themes of revenge and power.",
      role: "Anime Series",
      genres: ["Action", "Fantasy", "Drama"]
    },
    {
      image: "tanjiro.png",
      title: "Tanjiro Kamado",
      description: "A kind-hearted boy who became a demon slayer to save his sister and avenge his family.",
      funFact: "Tanjiro has an exceptional sense of smell, allowing him to detect demons and sense emotions.",
      role: "Main Protagonist",
      genres: ["Action, ", "Adventure, ", "Supernatural"]
    },
    {
      image: "Zenitsu.png",
      title: "Zenitsu Agatsuma",
      description: "A cowardly demon slayer with incredible lightning-fast abilities.",
      funFact: "Zenitsu can only use one form of Thunder Breathing, but he has mastered it to perfection.",
      role: "Support Character",
      genres: ["Action, ", "Adventure, ", "Comedy"]
    },
    {
      image: "nezuko.png",
      title: "Nezuko Kamado",
      description: "Tanjiro's sister who transformed into a demon but retains her humanity.",
      funFact: "Nezuko can shrink and grow in size, making her a versatile fighter.",
      role: "Deuteragonist",
      genres: ["Action, ", "Adventure, ", "Supernatural"]
    },
    {
      image: "inosuke.png",
      title: "Inosuke Hashibira",
      description: "A wild and headstrong demon slayer who wears a boar mask.",
      funFact: "Inosuke was raised by boars, which explains his wild and animalistic behavior.",
      role: "Comic Relief / Fighter",
      genres: ["Action, ", "Adventure, ", "Comedy"]
    },
    {
      image: "group.png",
      title: "The Team",
      description: "The team of demon slayers working together to defeat evil.",
      funFact: "Despite their differences, the team shares a strong bond built on trust and loyalty.",
      role: "Team Unity",
      genres: ["Action, ", "Adventure"]
    },
    {
      image: "https://4kwallpapers.com/images/wallpapers/demon-slayer-2048x2048-10716.jpg",
      title: "Demon Slayer",
      description: "A story of Tanjiro Kamado's journey to avenge his family and protect his sister.",
      funFact: "Demon Slayer has become a global phenomenon with stunning animation and powerful storytelling.",
      role: "Anime",
      genres: ["Action", "Adventure", "Supernatural"]
    },
    {
      image: "https://i.pinimg.com/736x/e4/64/75/e464758d26a1cd32a216404e5bc02a11.jpg",
      title: "Naruto",
      description: "Naruto Uzumaki dreams of becoming Hokage while overcoming challenges in his ninja journey.",
      funFact: "Naruto's iconic 'Believe It!' catchphrase is a localized addition.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Ninja"]
    },
    {
      image: "https://m.media-amazon.com/images/I/51SBAEcsd5L._AC_SY780_.jpg",
      title: "Dragon Ball Super",
      description: "Goku and his friends face gods, warriors, and universal threats.",
      funFact: "Dragon Ball Super introduced the concept of the multiverse.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcxa0rE1NVifoHRlKhLr1cL9nwCPzbI5vhdA&s",
      title: "Bleach",
      description: "Ichigo Kurosaki becomes a Soul Reaper to protect the living and the dead.",
      funFact: "Bleach's 'Bankai' transformations became a hallmark of the series.",
      role: "Anime Series",
      genres: ["Action", "Supernatural", "Fantasy"]
    },
    {
      image: "https://pbs.twimg.com/media/E2yWCgMUYAAnN-C.jpg:large",
      title: "My Hero Academia",
      description: "Izuku Midoriya trains to become the world’s greatest hero in a world full of superpowers.",
      funFact: "Each character’s quirks were inspired by real-world abilities.",
      role: "Anime Series",
      genres: ["Action", "Superhero", "Adventure"]
    },
    {
      image: "https://i.pinimg.com/736x/02/b3/24/02b324fedd5e913d0af16c0f325346ba.jpg",
      title: "Jujutsu Kaisen",
      description: "Yuji Itadori battles curses to protect the world while seeking to master cursed energy.",
      funFact: "Jujutsu Kaisen’s fight choreography is widely acclaimed.",
      role: "Anime Series",
      genres: ["Action", "Supernatural", "Fantasy"]
    },
    {
      image: "https://m.media-amazon.com/images/I/81cUBwUTL+L.jpg",
      title: "Dandadan",
      description: "An exciting mix of supernatural battles and heartfelt stories.",
      funFact: "Dandadan combines alien invasions and ghost hunting.",
      role: "Manga Series",
      genres: ["Action", "Supernatural", "Comedy"]
    },
    {
      image: "https://i.pinimg.com/originals/33/f4/ac/33f4ace132a4031fe8fcadfa1feb62cc.png",
      title: "Black Clover",
      description: "Asta, a boy without magic, seeks to become the Wizard King in a magical world.",
      funFact: "Black Clover's battles are praised for their intensity and visuals.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://i.pinimg.com/236x/f6/2b/f2/f62bf22f2b9966c24d861082088241d4.jpg",
      title: "Zatch Bell",
      description: "Zatch Bell is an adventure anime that follows the story of Kiyomaro Takamine, a young boy who teams up with a magical creature named Zatch Bell to fight against other 'mamodo' (demon) children in a battle to become the king of the demon world.",
      funFact: "This anime has inspired millions worldwide, especially with its unique combination of adventure, humor, and heartwarming moments.",
      role: "Anime Series",
      genres: ["Adventure", "Action", "Comedy"]
    },
    {
      image: "https://i.pinimg.com/474x/d5/a6/82/d5a682f0ede4715f4369add71a1a0f37.jpg",
      title: "Idaten Jump",
      description: "Idaten Jump follows a group of mountain bikers who participate in competitive races. The anime focuses on the protagonist, a young boy named Sho, who is passionate about racing and conquering the most challenging courses.",
      funFact: "It broke records for its animation budget, offering some of the most detailed racing scenes of its time.",
      role: "Anime Series",
      genres: ["Adventure", "Sports", "Action"]
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BM2YwNDdjOTktZjY2Yy00NTcxLWEzOTMtMGFlMTdlMzljNTdiXkEyXkFqcGc@._V1_.jpg",
      title: "Death March kara",
      description: "Death March kara, or 'Death March to the Parallel World Rhapsody,' is a fantasy anime that follows the protagonist, Ichiro Suzuki, a programmer who is transported to a fantasy world while on a 'death march' in his game development project. He uses his knowledge of the game world to survive.",
      funFact: "This series has a massive fan following in Japan and internationally, with its unique isekai (another world) concept.",
      role: "Anime Series",
      genres: ["Fantasy", "Adventure", "Isekai"]
    },
    {
      image: "https://images-cdn.ubuy.co.in/64f37d4a98be9872ad589ee7-poster-stop-online-one-punch-man-anime.jpg",
      title: "One Punch Man",
      description: "One Punch Man is a parody of traditional superhero and shonen anime. It follows Saitama, a hero who can defeat any opponent with a single punch. Bored with his strength, Saitama searches for a worthy adversary.",
      funFact: "The protagonist was inspired by a real-life person, a man who wanted to create a hero that could defeat any foe easily.",
      role: "Anime Series",
      genres: ["Action", "Comedy", "Superhero"]
    },
    {
      image: "https://s1.zerochan.net/Sword.Art.Online%3A.Alicization.Lycoris.600.2532438.jpg",
      title: "Sword Art Online",
      description: "Sword Art Online is a pioneering anime in the 'virtual reality' genre. The story follows Kirito, a player trapped in a virtual MMORPG. He must clear the game's dungeons to escape, but the stakes are life and death.",
      funFact: "Sword Art Online has been highly influential in shaping modern isekai anime.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Isekai"]
    },
    {
      image: "https://static.tvtropes.org/pmwiki/pub/images/fairy_tail_2020_visual_5.jpg",
      title: "Fairy Tail",
      description: "Fairy Tail is a magical adventure anime that follows the story of Natsu Dragneel and his friends in the Fairy Tail guild. They embark on quests, battle dark guilds, and grow stronger while making deep bonds with each other.",
      funFact: "Fairy Tail was serialized for over a decade and became one of the most iconic shonen anime series of its time.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://m.media-amazon.com/images/I/81Uu-Z2zYhL._AC_UF1000,1000_QL80_.jpg",
      title: "Seven Deadly Sins",
      description: "Seven Deadly Sins is a fantasy anime centered around Meliodas and his group of knights, each embodying one of the Seven Deadly Sins. They must protect the kingdom of Liones from various threats, including demons and corrupt rulers.",
      funFact: "The series features groundbreaking animation techniques, especially during fight scenes, that made it a fan favorite.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13924524_b_v13_ab.jpg",
      title: "Mob Psycho 100",
      description: "Mob Psycho 100 is a unique blend of comedy, action, and psychology. It tells the story of Shigeo Kageyama (Mob), a high school student with psychic powers. Mob struggles to balance his psychic abilities with his desire to lead a normal life.",
      funFact: "This anime’s art style is considered a masterpiece, especially with its distinct animation during fight sequences.",
      role: "Anime Series",
      genres: ["Comedy", "Action", "Supernatural"]
    },
    {
      image: "https://i.pinimg.com/736x/5f/c9/6e/5fc96ebf2a2ecb34162655417f0fae2b.jpg",
      title: "Charlotte",
      description: "Charlotte follows a group of teenagers who possess unique abilities. The story focuses on Yuu Otosaka, who uses his power to possess others' bodies for five seconds at a time, until a mysterious girl named Nao Tomori shows up.",
      funFact: "The protagonist's journey was inspired by a myth involving the ability to control time.",
      role: "Anime Series",
      genres: ["Drama", "Supernatural", "Psychological"]
    },
    {
      image: "https://www.animenewsnetwork.com/images/encyc/A20672-1892448872.1548292732.jpg",
      title: "Goblin Slayer",
      description: "Goblin Slayer is a dark fantasy anime that follows the story of a lone warrior known as the Goblin Slayer, who dedicates his life to hunting down goblins after witnessing the destruction they caused to his village.",
      funFact: "It took over five years to complete this series, and it quickly gained a cult following for its mature themes.",
      role: "Anime Series",
      genres: ["Action", "Fantasy", "Dark"]
    },
    {
      image: "https://i.pinimg.com/736x/3f/06/23/3f06237b631eb8c499ba638b888c1081.jpg",
      title: "Hunter X Hunter",
      description: "Hunter X Hunter follows Gon Freecss, a young boy who learns that his father, who he thought was dead, is actually a legendary Hunter. Gon embarks on an adventure to find his father and become a Hunter.",
      funFact: "The main character was voiced by a famous actor, and the anime is known for its deep character development and complex storylines.",
      role: "Anime Series",
      genres: ["Adventure", "Action", "Fantasy"]
    },
    {
      image: "https://preview.redd.it/is-overlord-worth-watching-v0-28dbcl9w6y2e1.png?width=640&crop=smart&auto=webp&s=0ec7fe81831615000ed2e4c156278756d0d1164c",
      title: "Overlord",
      description: "Overlord follows the story of Suzuki Satoru, a player who becomes trapped in a virtual MMORPG as his character, an undead overlord. As the game world becomes his reality, Satoru begins to rule over its inhabitants and seeks to conquer the unknown world.",
      funFact: "Overlord’s world-building is highly praised, with a vast and detailed fantasy world that immerses viewers.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://i.pinimg.com/736x/5d/7b/6b/5d7b6bae747ef1994f00bb52bf5f6ca9.jpg",
      title: "That Time I Got Reincarnated as a Slime",
      description: "That Time I Got Reincarnated as a Slime follows Satoru Mikami, a man who is reincarnated as a slime in a fantasy world. He gains powerful abilities and sets out to form a peaceful society with the monsters around him.",
      funFact: "The series was adapted from a popular light novel and became a hit due to its blend of comedy, action, and heartwarming moments.",
      role: "Anime Series",
      genres: ["Comedy", "Adventure", "Fantasy"]
    },
    {
      image: "https://i.pinimg.com/736x/69/c9/45/69c945b373dd418c1363ce621574c100.jpg",
      title: "Kiss X Sis",
      description: "Kiss X Sis follows Keita Suminoe, a high school student who finds himself in an unusual situation when his two stepsisters, Ako and Riko, develop romantic feelings for him.",
      funFact: "The series is known for its controversial themes and has been classified as an ecchi anime, with a mix of comedy, romance, and fan service.",
      role: "Anime Series",
      genres: ["Romance", "Ecchi", "Comedy"]
    },
    {
      image: "https://images.justwatch.com/poster/240115772/s718/the-testament-of-sister-new-devil.jpg",
      title: "The Testament of Sister New Devil",
      description: "The Testament of Sister New Devil follows Basara Tojo, a young man who is suddenly tasked with protecting two demon girls after his father marries their mother.",
      funFact: "This series is known for its action-packed scenes and supernatural themes combined with harem elements.",
      role: "Anime Series",
      genres: ["Action", "Fantasy", "Supernatural"]
    },
    {
      image: "https://cdn.myanimelist.net/s/common/uploaded_files/1655136392-483e85ac8a212937d95b1da17ff089f6.jpeg",
      title: "Harem in the Labyrinth of Another World",
      description: "Harem in the Labyrinth of Another World follows Michio Kaga, who is transported to a fantasy world and discovers that he has the ability to create a harem while navigating through a dangerous labyrinth filled with monsters and magic.",
      funFact: "The series features themes of adventure, romance, and harem, and explores the protagonist's journey in both the labyrinth and his relationships with the women he meets.",
      role: "Anime Series",
      genres: ["Adventure", "Fantasy", "Romance"]
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BYTY3MWFmMWQtYWViYS00MzBlLWJmYWQtODZlNTJkYjRiZTZkXkEyXkFqcGc@._V1_.jpg",
      title: "Redo of Healer",
      description: "Redo of Healer follows Keyaru, a healer who uses his healing powers to undo the traumas of his past life and seek revenge on those who wronged him.",
      funFact: "This controversial series has received mixed reactions due to its mature and explicit content, which explores themes of revenge and power.",
      role: "Anime Series",
      genres: ["Action", "Fantasy", "Drama"]
    },
    {
      image: "tanjiro.png",
      title: "Tanjiro Kamado",
      description: "A kind-hearted boy who became a demon slayer to save his sister and avenge his family.",
      funFact: "Tanjiro has an exceptional sense of smell, allowing him to detect demons and sense emotions.",
      role: "Main Protagonist",
      genres: ["Action, ", "Adventure, ", "Supernatural"]
    },
    {
      image: "Zenitsu.png",
      title: "Zenitsu Agatsuma",
      description: "A cowardly demon slayer with incredible lightning-fast abilities.",
      funFact: "Zenitsu can only use one form of Thunder Breathing, but he has mastered it to perfection.",
      role: "Support Character",
      genres: ["Action, ", "Adventure, ", "Comedy"]
    },
    {
      image: "nezuko.png",
      title: "Nezuko Kamado",
      description: "Tanjiro's sister who transformed into a demon but retains her humanity.",
      funFact: "Nezuko can shrink and grow in size, making her a versatile fighter.",
      role: "Deuteragonist",
      genres: ["Action, ", "Adventure, ", "Supernatural"]
    },
    {
      image: "inosuke.png",
      title: "Inosuke Hashibira",
      description: "A wild and headstrong demon slayer who wears a boar mask.",
      funFact: "Inosuke was raised by boars, which explains his wild and animalistic behavior.",
      role: "Comic Relief / Fighter",
      genres: ["Action, ", "Adventure, ", "Comedy"]
    },
    {
      image: "group.png",
      title: "The Team",
      description: "The team of demon slayers working together to defeat evil.",
      funFact: "Despite their differences, the team shares a strong bond built on trust and loyalty.",
      role: "Team Unity",
      genres: ["Action, ", "Adventure"]
    },
    {
      image: "https://4kwallpapers.com/images/wallpapers/demon-slayer-2048x2048-10716.jpg",
      title: "Demon Slayer",
      description: "A story of Tanjiro Kamado's journey to avenge his family and protect his sister.",
      funFact: "Demon Slayer has become a global phenomenon with stunning animation and powerful storytelling.",
      role: "Anime",
      genres: ["Action", "Adventure", "Supernatural"]
    },
    {
      image: "https://i.pinimg.com/736x/e4/64/75/e464758d26a1cd32a216404e5bc02a11.jpg",
      title: "Naruto",
      description: "Naruto Uzumaki dreams of becoming Hokage while overcoming challenges in his ninja journey.",
      funFact: "Naruto's iconic 'Believe It!' catchphrase is a localized addition.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Ninja"]
    },
    {
      image: "https://m.media-amazon.com/images/I/51SBAEcsd5L._AC_SY780_.jpg",
      title: "Dragon Ball Super",
      description: "Goku and his friends face gods, warriors, and universal threats.",
      funFact: "Dragon Ball Super introduced the concept of the multiverse.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcxa0rE1NVifoHRlKhLr1cL9nwCPzbI5vhdA&s",
      title: "Bleach",
      description: "Ichigo Kurosaki becomes a Soul Reaper to protect the living and the dead.",
      funFact: "Bleach's 'Bankai' transformations became a hallmark of the series.",
      role: "Anime Series",
      genres: ["Action", "Supernatural", "Fantasy"]
    },
    {
      image: "https://pbs.twimg.com/media/E2yWCgMUYAAnN-C.jpg:large",
      title: "My Hero Academia",
      description: "Izuku Midoriya trains to become the world’s greatest hero in a world full of superpowers.",
      funFact: "Each character’s quirks were inspired by real-world abilities.",
      role: "Anime Series",
      genres: ["Action", "Superhero", "Adventure"]
    },
    {
      image: "https://i.pinimg.com/736x/02/b3/24/02b324fedd5e913d0af16c0f325346ba.jpg",
      title: "Jujutsu Kaisen",
      description: "Yuji Itadori battles curses to protect the world while seeking to master cursed energy.",
      funFact: "Jujutsu Kaisen’s fight choreography is widely acclaimed.",
      role: "Anime Series",
      genres: ["Action", "Supernatural", "Fantasy"]
    },
    {
      image: "https://m.media-amazon.com/images/I/81cUBwUTL+L.jpg",
      title: "Dandadan",
      description: "An exciting mix of supernatural battles and heartfelt stories.",
      funFact: "Dandadan combines alien invasions and ghost hunting.",
      role: "Manga Series",
      genres: ["Action", "Supernatural", "Comedy"]
    },
    {
      image: "https://i.pinimg.com/originals/33/f4/ac/33f4ace132a4031fe8fcadfa1feb62cc.png",
      title: "Black Clover",
      description: "Asta, a boy without magic, seeks to become the Wizard King in a magical world.",
      funFact: "Black Clover's battles are praised for their intensity and visuals.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://i.pinimg.com/236x/f6/2b/f2/f62bf22f2b9966c24d861082088241d4.jpg",
      title: "Zatch Bell",
      description: "Zatch Bell is an adventure anime that follows the story of Kiyomaro Takamine, a young boy who teams up with a magical creature named Zatch Bell to fight against other 'mamodo' (demon) children in a battle to become the king of the demon world.",
      funFact: "This anime has inspired millions worldwide, especially with its unique combination of adventure, humor, and heartwarming moments.",
      role: "Anime Series",
      genres: ["Adventure", "Action", "Comedy"]
    },
    {
      image: "https://i.pinimg.com/474x/d5/a6/82/d5a682f0ede4715f4369add71a1a0f37.jpg",
      title: "Idaten Jump",
      description: "Idaten Jump follows a group of mountain bikers who participate in competitive races. The anime focuses on the protagonist, a young boy named Sho, who is passionate about racing and conquering the most challenging courses.",
      funFact: "It broke records for its animation budget, offering some of the most detailed racing scenes of its time.",
      role: "Anime Series",
      genres: ["Adventure", "Sports", "Action"]
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BM2YwNDdjOTktZjY2Yy00NTcxLWEzOTMtMGFlMTdlMzljNTdiXkEyXkFqcGc@._V1_.jpg",
      title: "Death March kara",
      description: "Death March kara, or 'Death March to the Parallel World Rhapsody,' is a fantasy anime that follows the protagonist, Ichiro Suzuki, a programmer who is transported to a fantasy world while on a 'death march' in his game development project. He uses his knowledge of the game world to survive.",
      funFact: "This series has a massive fan following in Japan and internationally, with its unique isekai (another world) concept.",
      role: "Anime Series",
      genres: ["Fantasy", "Adventure", "Isekai"]
    },
    {
      image: "https://images-cdn.ubuy.co.in/64f37d4a98be9872ad589ee7-poster-stop-online-one-punch-man-anime.jpg",
      title: "One Punch Man",
      description: "One Punch Man is a parody of traditional superhero and shonen anime. It follows Saitama, a hero who can defeat any opponent with a single punch. Bored with his strength, Saitama searches for a worthy adversary.",
      funFact: "The protagonist was inspired by a real-life person, a man who wanted to create a hero that could defeat any foe easily.",
      role: "Anime Series",
      genres: ["Action", "Comedy", "Superhero"]
    },
    {
      image: "https://s1.zerochan.net/Sword.Art.Online%3A.Alicization.Lycoris.600.2532438.jpg",
      title: "Sword Art Online",
      description: "Sword Art Online is a pioneering anime in the 'virtual reality' genre. The story follows Kirito, a player trapped in a virtual MMORPG. He must clear the game's dungeons to escape, but the stakes are life and death.",
      funFact: "Sword Art Online has been highly influential in shaping modern isekai anime.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Isekai"]
    },
    {
      image: "https://static.tvtropes.org/pmwiki/pub/images/fairy_tail_2020_visual_5.jpg",
      title: "Fairy Tail",
      description: "Fairy Tail is a magical adventure anime that follows the story of Natsu Dragneel and his friends in the Fairy Tail guild. They embark on quests, battle dark guilds, and grow stronger while making deep bonds with each other.",
      funFact: "Fairy Tail was serialized for over a decade and became one of the most iconic shonen anime series of its time.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://m.media-amazon.com/images/I/81Uu-Z2zYhL._AC_UF1000,1000_QL80_.jpg",
      title: "Seven Deadly Sins",
      description: "Seven Deadly Sins is a fantasy anime centered around Meliodas and his group of knights, each embodying one of the Seven Deadly Sins. They must protect the kingdom of Liones from various threats, including demons and corrupt rulers.",
      funFact: "The series features groundbreaking animation techniques, especially during fight scenes, that made it a fan favorite.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13924524_b_v13_ab.jpg",
      title: "Mob Psycho 100",
      description: "Mob Psycho 100 is a unique blend of comedy, action, and psychology. It tells the story of Shigeo Kageyama (Mob), a high school student with psychic powers. Mob struggles to balance his psychic abilities with his desire to lead a normal life.",
      funFact: "This anime’s art style is considered a masterpiece, especially with its distinct animation during fight sequences.",
      role: "Anime Series",
      genres: ["Comedy", "Action", "Supernatural"]
    },
    {
      image: "https://i.pinimg.com/736x/5f/c9/6e/5fc96ebf2a2ecb34162655417f0fae2b.jpg",
      title: "Charlotte",
      description: "Charlotte follows a group of teenagers who possess unique abilities. The story focuses on Yuu Otosaka, who uses his power to possess others' bodies for five seconds at a time, until a mysterious girl named Nao Tomori shows up.",
      funFact: "The protagonist's journey was inspired by a myth involving the ability to control time.",
      role: "Anime Series",
      genres: ["Drama", "Supernatural", "Psychological"]
    },
    {
      image: "https://www.animenewsnetwork.com/images/encyc/A20672-1892448872.1548292732.jpg",
      title: "Goblin Slayer",
      description: "Goblin Slayer is a dark fantasy anime that follows the story of a lone warrior known as the Goblin Slayer, who dedicates his life to hunting down goblins after witnessing the destruction they caused to his village.",
      funFact: "It took over five years to complete this series, and it quickly gained a cult following for its mature themes.",
      role: "Anime Series",
      genres: ["Action", "Fantasy", "Dark"]
    },
    {
      image: "https://i.pinimg.com/736x/3f/06/23/3f06237b631eb8c499ba638b888c1081.jpg",
      title: "Hunter X Hunter",
      description: "Hunter X Hunter follows Gon Freecss, a young boy who learns that his father, who he thought was dead, is actually a legendary Hunter. Gon embarks on an adventure to find his father and become a Hunter.",
      funFact: "The main character was voiced by a famous actor, and the anime is known for its deep character development and complex storylines.",
      role: "Anime Series",
      genres: ["Adventure", "Action", "Fantasy"]
    },
    {
      image: "https://preview.redd.it/is-overlord-worth-watching-v0-28dbcl9w6y2e1.png?width=640&crop=smart&auto=webp&s=0ec7fe81831615000ed2e4c156278756d0d1164c",
      title: "Overlord",
      description: "Overlord follows the story of Suzuki Satoru, a player who becomes trapped in a virtual MMORPG as his character, an undead overlord. As the game world becomes his reality, Satoru begins to rule over its inhabitants and seeks to conquer the unknown world.",
      funFact: "Overlord’s world-building is highly praised, with a vast and detailed fantasy world that immerses viewers.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://i.pinimg.com/736x/5d/7b/6b/5d7b6bae747ef1994f00bb52bf5f6ca9.jpg",
      title: "That Time I Got Reincarnated as a Slime",
      description: "That Time I Got Reincarnated as a Slime follows Satoru Mikami, a man who is reincarnated as a slime in a fantasy world. He gains powerful abilities and sets out to form a peaceful society with the monsters around him.",
      funFact: "The series was adapted from a popular light novel and became a hit due to its blend of comedy, action, and heartwarming moments.",
      role: "Anime Series",
      genres: ["Comedy", "Adventure", "Fantasy"]
    },
    {
      image: "https://i.pinimg.com/736x/69/c9/45/69c945b373dd418c1363ce621574c100.jpg",
      title: "Kiss X Sis",
      description: "Kiss X Sis follows Keita Suminoe, a high school student who finds himself in an unusual situation when his two stepsisters, Ako and Riko, develop romantic feelings for him.",
      funFact: "The series is known for its controversial themes and has been classified as an ecchi anime, with a mix of comedy, romance, and fan service.",
      role: "Anime Series",
      genres: ["Romance", "Ecchi", "Comedy"]
    },
    {
      image: "https://images.justwatch.com/poster/240115772/s718/the-testament-of-sister-new-devil.jpg",
      title: "The Testament of Sister New Devil",
      description: "The Testament of Sister New Devil follows Basara Tojo, a young man who is suddenly tasked with protecting two demon girls after his father marries their mother.",
      funFact: "This series is known for its action-packed scenes and supernatural themes combined with harem elements.",
      role: "Anime Series",
      genres: ["Action", "Fantasy", "Supernatural"]
    },
    {
      image: "https://cdn.myanimelist.net/s/common/uploaded_files/1655136392-483e85ac8a212937d95b1da17ff089f6.jpeg",
      title: "Harem in the Labyrinth of Another World",
      description: "Harem in the Labyrinth of Another World follows Michio Kaga, who is transported to a fantasy world and discovers that he has the ability to create a harem while navigating through a dangerous labyrinth filled with monsters and magic.",
      funFact: "The series features themes of adventure, romance, and harem, and explores the protagonist's journey in both the labyrinth and his relationships with the women he meets.",
      role: "Anime Series",
      genres: ["Adventure", "Fantasy", "Romance"]
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BYTY3MWFmMWQtYWViYS00MzBlLWJmYWQtODZlNTJkYjRiZTZkXkEyXkFqcGc@._V1_.jpg",
      title: "Redo of Healer",
      description: "Redo of Healer follows Keyaru, a healer who uses his healing powers to undo the traumas of his past life and seek revenge on those who wronged him.",
      funFact: "This controversial series has received mixed reactions due to its mature and explicit content, which explores themes of revenge and power.",
      role: "Anime Series",
      genres: ["Action", "Fantasy", "Drama"]
    },
    {
      image: "tanjiro.png",
      title: "Tanjiro Kamado",
      description: "A kind-hearted boy who became a demon slayer to save his sister and avenge his family.",
      funFact: "Tanjiro has an exceptional sense of smell, allowing him to detect demons and sense emotions.",
      role: "Main Protagonist",
      genres: ["Action, ", "Adventure, ", "Supernatural"]
    },
    {
      image: "Zenitsu.png",
      title: "Zenitsu Agatsuma",
      description: "A cowardly demon slayer with incredible lightning-fast abilities.",
      funFact: "Zenitsu can only use one form of Thunder Breathing, but he has mastered it to perfection.",
      role: "Support Character",
      genres: ["Action, ", "Adventure, ", "Comedy"]
    },
    {
      image: "nezuko.png",
      title: "Nezuko Kamado",
      description: "Tanjiro's sister who transformed into a demon but retains her humanity.",
      funFact: "Nezuko can shrink and grow in size, making her a versatile fighter.",
      role: "Deuteragonist",
      genres: ["Action, ", "Adventure, ", "Supernatural"]
    },
    {
      image: "inosuke.png",
      title: "Inosuke Hashibira",
      description: "A wild and headstrong demon slayer who wears a boar mask.",
      funFact: "Inosuke was raised by boars, which explains his wild and animalistic behavior.",
      role: "Comic Relief / Fighter",
      genres: ["Action, ", "Adventure, ", "Comedy"]
    },
    {
      image: "group.png",
      title: "The Team",
      description: "The team of demon slayers working together to defeat evil.",
      funFact: "Despite their differences, the team shares a strong bond built on trust and loyalty.",
      role: "Team Unity",
      genres: ["Action, ", "Adventure"]
    },
    {
      image: "https://4kwallpapers.com/images/wallpapers/demon-slayer-2048x2048-10716.jpg",
      title: "Demon Slayer",
      description: "A story of Tanjiro Kamado's journey to avenge his family and protect his sister.",
      funFact: "Demon Slayer has become a global phenomenon with stunning animation and powerful storytelling.",
      role: "Anime",
      genres: ["Action", "Adventure", "Supernatural"]
    },
    {
      image: "https://i.pinimg.com/736x/e4/64/75/e464758d26a1cd32a216404e5bc02a11.jpg",
      title: "Naruto",
      description: "Naruto Uzumaki dreams of becoming Hokage while overcoming challenges in his ninja journey.",
      funFact: "Naruto's iconic 'Believe It!' catchphrase is a localized addition.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Ninja"]
    },
    {
      image: "https://m.media-amazon.com/images/I/51SBAEcsd5L._AC_SY780_.jpg",
      title: "Dragon Ball Super",
      description: "Goku and his friends face gods, warriors, and universal threats.",
      funFact: "Dragon Ball Super introduced the concept of the multiverse.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcxa0rE1NVifoHRlKhLr1cL9nwCPzbI5vhdA&s",
      title: "Bleach",
      description: "Ichigo Kurosaki becomes a Soul Reaper to protect the living and the dead.",
      funFact: "Bleach's 'Bankai' transformations became a hallmark of the series.",
      role: "Anime Series",
      genres: ["Action", "Supernatural", "Fantasy"]
    },
    {
      image: "https://pbs.twimg.com/media/E2yWCgMUYAAnN-C.jpg:large",
      title: "My Hero Academia",
      description: "Izuku Midoriya trains to become the world’s greatest hero in a world full of superpowers.",
      funFact: "Each character’s quirks were inspired by real-world abilities.",
      role: "Anime Series",
      genres: ["Action", "Superhero", "Adventure"]
    },
    {
      image: "https://i.pinimg.com/736x/02/b3/24/02b324fedd5e913d0af16c0f325346ba.jpg",
      title: "Jujutsu Kaisen",
      description: "Yuji Itadori battles curses to protect the world while seeking to master cursed energy.",
      funFact: "Jujutsu Kaisen’s fight choreography is widely acclaimed.",
      role: "Anime Series",
      genres: ["Action", "Supernatural", "Fantasy"]
    },
    {
      image: "https://m.media-amazon.com/images/I/81cUBwUTL+L.jpg",
      title: "Dandadan",
      description: "An exciting mix of supernatural battles and heartfelt stories.",
      funFact: "Dandadan combines alien invasions and ghost hunting.",
      role: "Manga Series",
      genres: ["Action", "Supernatural", "Comedy"]
    },
    {
      image: "https://i.pinimg.com/originals/33/f4/ac/33f4ace132a4031fe8fcadfa1feb62cc.png",
      title: "Black Clover",
      description: "Asta, a boy without magic, seeks to become the Wizard King in a magical world.",
      funFact: "Black Clover's battles are praised for their intensity and visuals.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://i.pinimg.com/236x/f6/2b/f2/f62bf22f2b9966c24d861082088241d4.jpg",
      title: "Zatch Bell",
      description: "Zatch Bell is an adventure anime that follows the story of Kiyomaro Takamine, a young boy who teams up with a magical creature named Zatch Bell to fight against other 'mamodo' (demon) children in a battle to become the king of the demon world.",
      funFact: "This anime has inspired millions worldwide, especially with its unique combination of adventure, humor, and heartwarming moments.",
      role: "Anime Series",
      genres: ["Adventure", "Action", "Comedy"]
    },
    {
      image: "https://i.pinimg.com/474x/d5/a6/82/d5a682f0ede4715f4369add71a1a0f37.jpg",
      title: "Idaten Jump",
      description: "Idaten Jump follows a group of mountain bikers who participate in competitive races. The anime focuses on the protagonist, a young boy named Sho, who is passionate about racing and conquering the most challenging courses.",
      funFact: "It broke records for its animation budget, offering some of the most detailed racing scenes of its time.",
      role: "Anime Series",
      genres: ["Adventure", "Sports", "Action"]
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BM2YwNDdjOTktZjY2Yy00NTcxLWEzOTMtMGFlMTdlMzljNTdiXkEyXkFqcGc@._V1_.jpg",
      title: "Death March kara",
      description: "Death March kara, or 'Death March to the Parallel World Rhapsody,' is a fantasy anime that follows the protagonist, Ichiro Suzuki, a programmer who is transported to a fantasy world while on a 'death march' in his game development project. He uses his knowledge of the game world to survive.",
      funFact: "This series has a massive fan following in Japan and internationally, with its unique isekai (another world) concept.",
      role: "Anime Series",
      genres: ["Fantasy", "Adventure", "Isekai"]
    },
    {
      image: "https://images-cdn.ubuy.co.in/64f37d4a98be9872ad589ee7-poster-stop-online-one-punch-man-anime.jpg",
      title: "One Punch Man",
      description: "One Punch Man is a parody of traditional superhero and shonen anime. It follows Saitama, a hero who can defeat any opponent with a single punch. Bored with his strength, Saitama searches for a worthy adversary.",
      funFact: "The protagonist was inspired by a real-life person, a man who wanted to create a hero that could defeat any foe easily.",
      role: "Anime Series",
      genres: ["Action", "Comedy", "Superhero"]
    },
    {
      image: "https://s1.zerochan.net/Sword.Art.Online%3A.Alicization.Lycoris.600.2532438.jpg",
      title: "Sword Art Online",
      description: "Sword Art Online is a pioneering anime in the 'virtual reality' genre. The story follows Kirito, a player trapped in a virtual MMORPG. He must clear the game's dungeons to escape, but the stakes are life and death.",
      funFact: "Sword Art Online has been highly influential in shaping modern isekai anime.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Isekai"]
    },
    {
      image: "https://static.tvtropes.org/pmwiki/pub/images/fairy_tail_2020_visual_5.jpg",
      title: "Fairy Tail",
      description: "Fairy Tail is a magical adventure anime that follows the story of Natsu Dragneel and his friends in the Fairy Tail guild. They embark on quests, battle dark guilds, and grow stronger while making deep bonds with each other.",
      funFact: "Fairy Tail was serialized for over a decade and became one of the most iconic shonen anime series of its time.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://m.media-amazon.com/images/I/81Uu-Z2zYhL._AC_UF1000,1000_QL80_.jpg",
      title: "Seven Deadly Sins",
      description: "Seven Deadly Sins is a fantasy anime centered around Meliodas and his group of knights, each embodying one of the Seven Deadly Sins. They must protect the kingdom of Liones from various threats, including demons and corrupt rulers.",
      funFact: "The series features groundbreaking animation techniques, especially during fight scenes, that made it a fan favorite.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13924524_b_v13_ab.jpg",
      title: "Mob Psycho 100",
      description: "Mob Psycho 100 is a unique blend of comedy, action, and psychology. It tells the story of Shigeo Kageyama (Mob), a high school student with psychic powers. Mob struggles to balance his psychic abilities with his desire to lead a normal life.",
      funFact: "This anime’s art style is considered a masterpiece, especially with its distinct animation during fight sequences.",
      role: "Anime Series",
      genres: ["Comedy", "Action", "Supernatural"]
    },
    {
      image: "https://i.pinimg.com/736x/5f/c9/6e/5fc96ebf2a2ecb34162655417f0fae2b.jpg",
      title: "Charlotte",
      description: "Charlotte follows a group of teenagers who possess unique abilities. The story focuses on Yuu Otosaka, who uses his power to possess others' bodies for five seconds at a time, until a mysterious girl named Nao Tomori shows up.",
      funFact: "The protagonist's journey was inspired by a myth involving the ability to control time.",
      role: "Anime Series",
      genres: ["Drama", "Supernatural", "Psychological"]
    },
    {
      image: "https://www.animenewsnetwork.com/images/encyc/A20672-1892448872.1548292732.jpg",
      title: "Goblin Slayer",
      description: "Goblin Slayer is a dark fantasy anime that follows the story of a lone warrior known as the Goblin Slayer, who dedicates his life to hunting down goblins after witnessing the destruction they caused to his village.",
      funFact: "It took over five years to complete this series, and it quickly gained a cult following for its mature themes.",
      role: "Anime Series",
      genres: ["Action", "Fantasy", "Dark"]
    },
    {
      image: "https://i.pinimg.com/736x/3f/06/23/3f06237b631eb8c499ba638b888c1081.jpg",
      title: "Hunter X Hunter",
      description: "Hunter X Hunter follows Gon Freecss, a young boy who learns that his father, who he thought was dead, is actually a legendary Hunter. Gon embarks on an adventure to find his father and become a Hunter.",
      funFact: "The main character was voiced by a famous actor, and the anime is known for its deep character development and complex storylines.",
      role: "Anime Series",
      genres: ["Adventure", "Action", "Fantasy"]
    },
    {
      image: "https://preview.redd.it/is-overlord-worth-watching-v0-28dbcl9w6y2e1.png?width=640&crop=smart&auto=webp&s=0ec7fe81831615000ed2e4c156278756d0d1164c",
      title: "Overlord",
      description: "Overlord follows the story of Suzuki Satoru, a player who becomes trapped in a virtual MMORPG as his character, an undead overlord. As the game world becomes his reality, Satoru begins to rule over its inhabitants and seeks to conquer the unknown world.",
      funFact: "Overlord’s world-building is highly praised, with a vast and detailed fantasy world that immerses viewers.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://i.pinimg.com/736x/5d/7b/6b/5d7b6bae747ef1994f00bb52bf5f6ca9.jpg",
      title: "That Time I Got Reincarnated as a Slime",
      description: "That Time I Got Reincarnated as a Slime follows Satoru Mikami, a man who is reincarnated as a slime in a fantasy world. He gains powerful abilities and sets out to form a peaceful society with the monsters around him.",
      funFact: "The series was adapted from a popular light novel and became a hit due to its blend of comedy, action, and heartwarming moments.",
      role: "Anime Series",
      genres: ["Comedy", "Adventure", "Fantasy"]
    },
    {
      image: "https://i.pinimg.com/736x/69/c9/45/69c945b373dd418c1363ce621574c100.jpg",
      title: "Kiss X Sis",
      description: "Kiss X Sis follows Keita Suminoe, a high school student who finds himself in an unusual situation when his two stepsisters, Ako and Riko, develop romantic feelings for him.",
      funFact: "The series is known for its controversial themes and has been classified as an ecchi anime, with a mix of comedy, romance, and fan service.",
      role: "Anime Series",
      genres: ["Romance", "Ecchi", "Comedy"]
    },
    {
      image: "https://images.justwatch.com/poster/240115772/s718/the-testament-of-sister-new-devil.jpg",
      title: "The Testament of Sister New Devil",
      description: "The Testament of Sister New Devil follows Basara Tojo, a young man who is suddenly tasked with protecting two demon girls after his father marries their mother.",
      funFact: "This series is known for its action-packed scenes and supernatural themes combined with harem elements.",
      role: "Anime Series",
      genres: ["Action", "Fantasy", "Supernatural"]
    },
    {
      image: "https://cdn.myanimelist.net/s/common/uploaded_files/1655136392-483e85ac8a212937d95b1da17ff089f6.jpeg",
      title: "Harem in the Labyrinth of Another World",
      description: "Harem in the Labyrinth of Another World follows Michio Kaga, who is transported to a fantasy world and discovers that he has the ability to create a harem while navigating through a dangerous labyrinth filled with monsters and magic.",
      funFact: "The series features themes of adventure, romance, and harem, and explores the protagonist's journey in both the labyrinth and his relationships with the women he meets.",
      role: "Anime Series",
      genres: ["Adventure", "Fantasy", "Romance"]
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BYTY3MWFmMWQtYWViYS00MzBlLWJmYWQtODZlNTJkYjRiZTZkXkEyXkFqcGc@._V1_.jpg",
      title: "Redo of Healer",
      description: "Redo of Healer follows Keyaru, a healer who uses his healing powers to undo the traumas of his past life and seek revenge on those who wronged him.",
      funFact: "This controversial series has received mixed reactions due to its mature and explicit content, which explores themes of revenge and power.",
      role: "Anime Series",
      genres: ["Action", "Fantasy", "Drama"]
    },
    {
      image: "tanjiro.png",
      title: "Tanjiro Kamado",
      description: "A kind-hearted boy who became a demon slayer to save his sister and avenge his family.",
      funFact: "Tanjiro has an exceptional sense of smell, allowing him to detect demons and sense emotions.",
      role: "Main Protagonist",
      genres: ["Action, ", "Adventure, ", "Supernatural"]
    },
    {
      image: "Zenitsu.png",
      title: "Zenitsu Agatsuma",
      description: "A cowardly demon slayer with incredible lightning-fast abilities.",
      funFact: "Zenitsu can only use one form of Thunder Breathing, but he has mastered it to perfection.",
      role: "Support Character",
      genres: ["Action, ", "Adventure, ", "Comedy"]
    },
    {
      image: "nezuko.png",
      title: "Nezuko Kamado",
      description: "Tanjiro's sister who transformed into a demon but retains her humanity.",
      funFact: "Nezuko can shrink and grow in size, making her a versatile fighter.",
      role: "Deuteragonist",
      genres: ["Action, ", "Adventure, ", "Supernatural"]
    },
    {
      image: "inosuke.png",
      title: "Inosuke Hashibira",
      description: "A wild and headstrong demon slayer who wears a boar mask.",
      funFact: "Inosuke was raised by boars, which explains his wild and animalistic behavior.",
      role: "Comic Relief / Fighter",
      genres: ["Action, ", "Adventure, ", "Comedy"]
    },
    {
      image: "group.png",
      title: "The Team",
      description: "The team of demon slayers working together to defeat evil.",
      funFact: "Despite their differences, the team shares a strong bond built on trust and loyalty.",
      role: "Team Unity",
      genres: ["Action, ", "Adventure"]
    },
    {
      image: "https://4kwallpapers.com/images/wallpapers/demon-slayer-2048x2048-10716.jpg",
      title: "Demon Slayer",
      description: "A story of Tanjiro Kamado's journey to avenge his family and protect his sister.",
      funFact: "Demon Slayer has become a global phenomenon with stunning animation and powerful storytelling.",
      role: "Anime",
      genres: ["Action", "Adventure", "Supernatural"]
    },
    {
      image: "https://i.pinimg.com/736x/e4/64/75/e464758d26a1cd32a216404e5bc02a11.jpg",
      title: "Naruto",
      description: "Naruto Uzumaki dreams of becoming Hokage while overcoming challenges in his ninja journey.",
      funFact: "Naruto's iconic 'Believe It!' catchphrase is a localized addition.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Ninja"]
    },
    {
      image: "https://m.media-amazon.com/images/I/51SBAEcsd5L._AC_SY780_.jpg",
      title: "Dragon Ball Super",
      description: "Goku and his friends face gods, warriors, and universal threats.",
      funFact: "Dragon Ball Super introduced the concept of the multiverse.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcxa0rE1NVifoHRlKhLr1cL9nwCPzbI5vhdA&s",
      title: "Bleach",
      description: "Ichigo Kurosaki becomes a Soul Reaper to protect the living and the dead.",
      funFact: "Bleach's 'Bankai' transformations became a hallmark of the series.",
      role: "Anime Series",
      genres: ["Action", "Supernatural", "Fantasy"]
    },
    {
      image: "https://pbs.twimg.com/media/E2yWCgMUYAAnN-C.jpg:large",
      title: "My Hero Academia",
      description: "Izuku Midoriya trains to become the world’s greatest hero in a world full of superpowers.",
      funFact: "Each character’s quirks were inspired by real-world abilities.",
      role: "Anime Series",
      genres: ["Action", "Superhero", "Adventure"]
    },
    {
      image: "https://i.pinimg.com/736x/02/b3/24/02b324fedd5e913d0af16c0f325346ba.jpg",
      title: "Jujutsu Kaisen",
      description: "Yuji Itadori battles curses to protect the world while seeking to master cursed energy.",
      funFact: "Jujutsu Kaisen’s fight choreography is widely acclaimed.",
      role: "Anime Series",
      genres: ["Action", "Supernatural", "Fantasy"]
    },
    {
      image: "https://m.media-amazon.com/images/I/81cUBwUTL+L.jpg",
      title: "Dandadan",
      description: "An exciting mix of supernatural battles and heartfelt stories.",
      funFact: "Dandadan combines alien invasions and ghost hunting.",
      role: "Manga Series",
      genres: ["Action", "Supernatural", "Comedy"]
    },
    {
      image: "https://i.pinimg.com/originals/33/f4/ac/33f4ace132a4031fe8fcadfa1feb62cc.png",
      title: "Black Clover",
      description: "Asta, a boy without magic, seeks to become the Wizard King in a magical world.",
      funFact: "Black Clover's battles are praised for their intensity and visuals.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://i.pinimg.com/236x/f6/2b/f2/f62bf22f2b9966c24d861082088241d4.jpg",
      title: "Zatch Bell",
      description: "Zatch Bell is an adventure anime that follows the story of Kiyomaro Takamine, a young boy who teams up with a magical creature named Zatch Bell to fight against other 'mamodo' (demon) children in a battle to become the king of the demon world.",
      funFact: "This anime has inspired millions worldwide, especially with its unique combination of adventure, humor, and heartwarming moments.",
      role: "Anime Series",
      genres: ["Adventure", "Action", "Comedy"]
    },
    {
      image: "https://i.pinimg.com/474x/d5/a6/82/d5a682f0ede4715f4369add71a1a0f37.jpg",
      title: "Idaten Jump",
      description: "Idaten Jump follows a group of mountain bikers who participate in competitive races. The anime focuses on the protagonist, a young boy named Sho, who is passionate about racing and conquering the most challenging courses.",
      funFact: "It broke records for its animation budget, offering some of the most detailed racing scenes of its time.",
      role: "Anime Series",
      genres: ["Adventure", "Sports", "Action"]
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BM2YwNDdjOTktZjY2Yy00NTcxLWEzOTMtMGFlMTdlMzljNTdiXkEyXkFqcGc@._V1_.jpg",
      title: "Death March kara",
      description: "Death March kara, or 'Death March to the Parallel World Rhapsody,' is a fantasy anime that follows the protagonist, Ichiro Suzuki, a programmer who is transported to a fantasy world while on a 'death march' in his game development project. He uses his knowledge of the game world to survive.",
      funFact: "This series has a massive fan following in Japan and internationally, with its unique isekai (another world) concept.",
      role: "Anime Series",
      genres: ["Fantasy", "Adventure", "Isekai"]
    },
    {
      image: "https://images-cdn.ubuy.co.in/64f37d4a98be9872ad589ee7-poster-stop-online-one-punch-man-anime.jpg",
      title: "One Punch Man",
      description: "One Punch Man is a parody of traditional superhero and shonen anime. It follows Saitama, a hero who can defeat any opponent with a single punch. Bored with his strength, Saitama searches for a worthy adversary.",
      funFact: "The protagonist was inspired by a real-life person, a man who wanted to create a hero that could defeat any foe easily.",
      role: "Anime Series",
      genres: ["Action", "Comedy", "Superhero"]
    },
    {
      image: "https://s1.zerochan.net/Sword.Art.Online%3A.Alicization.Lycoris.600.2532438.jpg",
      title: "Sword Art Online",
      description: "Sword Art Online is a pioneering anime in the 'virtual reality' genre. The story follows Kirito, a player trapped in a virtual MMORPG. He must clear the game's dungeons to escape, but the stakes are life and death.",
      funFact: "Sword Art Online has been highly influential in shaping modern isekai anime.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Isekai"]
    },
    {
      image: "https://static.tvtropes.org/pmwiki/pub/images/fairy_tail_2020_visual_5.jpg",
      title: "Fairy Tail",
      description: "Fairy Tail is a magical adventure anime that follows the story of Natsu Dragneel and his friends in the Fairy Tail guild. They embark on quests, battle dark guilds, and grow stronger while making deep bonds with each other.",
      funFact: "Fairy Tail was serialized for over a decade and became one of the most iconic shonen anime series of its time.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://m.media-amazon.com/images/I/81Uu-Z2zYhL._AC_UF1000,1000_QL80_.jpg",
      title: "Seven Deadly Sins",
      description: "Seven Deadly Sins is a fantasy anime centered around Meliodas and his group of knights, each embodying one of the Seven Deadly Sins. They must protect the kingdom of Liones from various threats, including demons and corrupt rulers.",
      funFact: "The series features groundbreaking animation techniques, especially during fight scenes, that made it a fan favorite.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13924524_b_v13_ab.jpg",
      title: "Mob Psycho 100",
      description: "Mob Psycho 100 is a unique blend of comedy, action, and psychology. It tells the story of Shigeo Kageyama (Mob), a high school student with psychic powers. Mob struggles to balance his psychic abilities with his desire to lead a normal life.",
      funFact: "This anime’s art style is considered a masterpiece, especially with its distinct animation during fight sequences.",
      role: "Anime Series",
      genres: ["Comedy", "Action", "Supernatural"]
    },
    {
      image: "https://i.pinimg.com/736x/5f/c9/6e/5fc96ebf2a2ecb34162655417f0fae2b.jpg",
      title: "Charlotte",
      description: "Charlotte follows a group of teenagers who possess unique abilities. The story focuses on Yuu Otosaka, who uses his power to possess others' bodies for five seconds at a time, until a mysterious girl named Nao Tomori shows up.",
      funFact: "The protagonist's journey was inspired by a myth involving the ability to control time.",
      role: "Anime Series",
      genres: ["Drama", "Supernatural", "Psychological"]
    },
    {
      image: "https://www.animenewsnetwork.com/images/encyc/A20672-1892448872.1548292732.jpg",
      title: "Goblin Slayer",
      description: "Goblin Slayer is a dark fantasy anime that follows the story of a lone warrior known as the Goblin Slayer, who dedicates his life to hunting down goblins after witnessing the destruction they caused to his village.",
      funFact: "It took over five years to complete this series, and it quickly gained a cult following for its mature themes.",
      role: "Anime Series",
      genres: ["Action", "Fantasy", "Dark"]
    },
    {
      image: "https://i.pinimg.com/736x/3f/06/23/3f06237b631eb8c499ba638b888c1081.jpg",
      title: "Hunter X Hunter",
      description: "Hunter X Hunter follows Gon Freecss, a young boy who learns that his father, who he thought was dead, is actually a legendary Hunter. Gon embarks on an adventure to find his father and become a Hunter.",
      funFact: "The main character was voiced by a famous actor, and the anime is known for its deep character development and complex storylines.",
      role: "Anime Series",
      genres: ["Adventure", "Action", "Fantasy"]
    },
    {
      image: "https://preview.redd.it/is-overlord-worth-watching-v0-28dbcl9w6y2e1.png?width=640&crop=smart&auto=webp&s=0ec7fe81831615000ed2e4c156278756d0d1164c",
      title: "Overlord",
      description: "Overlord follows the story of Suzuki Satoru, a player who becomes trapped in a virtual MMORPG as his character, an undead overlord. As the game world becomes his reality, Satoru begins to rule over its inhabitants and seeks to conquer the unknown world.",
      funFact: "Overlord’s world-building is highly praised, with a vast and detailed fantasy world that immerses viewers.",
      role: "Anime Series",
      genres: ["Action", "Adventure", "Fantasy"]
    },
    {
      image: "https://i.pinimg.com/736x/5d/7b/6b/5d7b6bae747ef1994f00bb52bf5f6ca9.jpg",
      title: "That Time I Got Reincarnated as a Slime",
      description: "That Time I Got Reincarnated as a Slime follows Satoru Mikami, a man who is reincarnated as a slime in a fantasy world. He gains powerful abilities and sets out to form a peaceful society with the monsters around him.",
      funFact: "The series was adapted from a popular light novel and became a hit due to its blend of comedy, action, and heartwarming moments.",
      role: "Anime Series",
      genres: ["Comedy", "Adventure", "Fantasy"]
    },
    {
      image: "https://i.pinimg.com/736x/69/c9/45/69c945b373dd418c1363ce621574c100.jpg",
      title: "Kiss X Sis",
      description: "Kiss X Sis follows Keita Suminoe, a high school student who finds himself in an unusual situation when his two stepsisters, Ako and Riko, develop romantic feelings for him.",
      funFact: "The series is known for its controversial themes and has been classified as an ecchi anime, with a mix of comedy, romance, and fan service.",
      role: "Anime Series",
      genres: ["Romance", "Ecchi", "Comedy"]
    },
    {
      image: "https://images.justwatch.com/poster/240115772/s718/the-testament-of-sister-new-devil.jpg",
      title: "The Testament of Sister New Devil",
      description: "The Testament of Sister New Devil follows Basara Tojo, a young man who is suddenly tasked with protecting two demon girls after his father marries their mother.",
      funFact: "This series is known for its action-packed scenes and supernatural themes combined with harem elements.",
      role: "Anime Series",
      genres: ["Action", "Fantasy", "Supernatural"]
    },
    {
      image: "https://cdn.myanimelist.net/s/common/uploaded_files/1655136392-483e85ac8a212937d95b1da17ff089f6.jpeg",
      title: "Harem in the Labyrinth of Another World",
      description: "Harem in the Labyrinth of Another World follows Michio Kaga, who is transported to a fantasy world and discovers that he has the ability to create a harem while navigating through a dangerous labyrinth filled with monsters and magic.",
      funFact: "The series features themes of adventure, romance, and harem, and explores the protagonist's journey in both the labyrinth and his relationships with the women he meets.",
      role: "Anime Series",
      genres: ["Adventure", "Fantasy", "Romance"]
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BYTY3MWFmMWQtYWViYS00MzBlLWJmYWQtODZlNTJkYjRiZTZkXkEyXkFqcGc@._V1_.jpg",
      title: "Redo of Healer",
      description: "Redo of Healer follows Keyaru, a healer who uses his healing powers to undo the traumas of his past life and seek revenge on those who wronged him.",
      funFact: "This controversial series has received mixed reactions due to its mature and explicit content, which explores themes of revenge and power.",
      role: "Anime Series",
      genres: ["Action", "Fantasy", "Drama"]
    }
  ];

  const head = [
    {
      image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6e5f72102808543.5fed3c28a58f1.png",
    },
    {
      image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/175e71102113513.615599d6ececa.jpg",
    },
    {
      image: "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/171996434/original/7d1910b22e8d48f0a5943720de36edfe192a9561/do-unique-looking-anime-and-manga-header.png",
    },
    {
      image: "https://i.ytimg.com/vi/rCUMGGstZH8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBdOUYVCwE-iUprhNVEiEI2CDkbjA",
    },
    {
      image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/348748105464265.6246a95fbd546.png",
    },
    {
      image: "https://payhip.com/cdn-cgi/image/format=auto,width=1500/https://pe56d.s3.amazonaws.com/o_1f25ruruaasbttn1sc2nqfdr610.png",
    },
    {
      image: "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/281937653/original/62b1e25649708fe297eb4a6473a9cf75f3bc9fc2/an-amazing-anime-header-or-banner-for-you.png",
    },
    {
      image: "https://i.pinimg.com/originals/9c/a2/16/9ca216e583387233da57628917f090cf.jpg",
    }
  ];
  const cardContainerRef = useRef(null); // Define the ref here
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const maxVisibleButtons = 4;

  // Calculate the starting index for the current page (adjust to start from index 5)
  const startIndex = (currentPage - 1) * itemsPerPage + 5; // Adjust to start from the first page
  const totalPages = Math.ceil((slides.length - 5) / itemsPerPage); // Adjust total pages for index 5 onward
  const currentItems = slides.slice(startIndex, startIndex + itemsPerPage); // Get current page items

  const [currentIndexSlides, setCurrentIndexSlides] = useState(0); // Set the slides index
  const [currentIndexHead, setCurrentIndexHead] = useState(0); // Set the head index

  // First slideshow for `slides` (showing 5 images)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexSlides((prevIndex) => (prevIndex + 1) % 5); // Corrected to use setCurrentIndexSlides
    }, 4000); // Duration should match animation time (4 seconds)

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Second slideshow for `head` (showing 3 images)
  useEffect(() => {
    const intervalHead = setInterval(() => {
      setCurrentIndexHead((prevIndex) => (prevIndex + 1) % head.length); // Corrected to use setCurrentIndexHead
    }, 4000); // Change every 4 seconds

    return () => clearInterval(intervalHead); // Cleanup interval on unmount
  }, [head.length]);

  // Handle page change and scroll to top
  const changePage = (page) => {
    setCurrentPage(page);
    cardContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getPaginationRange = () => {
    const totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    const start = Math.max(0, currentPage - Math.ceil(maxVisibleButtons / 2));
    const end = Math.min(totalPages, start + maxVisibleButtons);

    return totalPagesArray.slice(start, end);
  };


  return (
    <div className="App">
      <nav>
        <ul>
          <div className="logo">
          <img src={`${process.env.PUBLIC_URL}/logo2.png`} alt="Logo" />
          SubAnime
          </div>
          <li className="custom-btn btn-5">
            <span>Home</span>
          </li>
          <li className="custom-btn btn-5">
            <span>Contact</span>
          </li>
          <li className="custom-btn btn-5">
            <span>Product</span>
          </li>
          <li className="custom-btn btn-5">
            <span>About</span>
          </li>
        </ul>
      </nav>

      {/* First Slideshow - Slides */}
      <div className="slideshow">
        <div className="text-container">
          {slides.slice(0, 5).map((slide, index) => (
            <div
              key={index}
              className={`text ${currentIndexSlides === index ? "active" : "inactive"}`}
            >
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <p><strong>Fun Fact:</strong> {slide.funFact}</p>
              <p><strong>Role:</strong> {slide.role}</p>
              <p><strong>Genres:</strong> {slide.genres}</p>
              <button className="custom-btn btn-12">
                <span>Click!</span>
                <span>Read More</span>
              </button>
            </div>
          ))}
        </div>
        <div className="back-image-container">
          {slides.slice(0, 5).map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className={currentIndexSlides === index ? "active" : "inactive"}
            />
          ))}
        </div>
      </div>

      {/* Second Slideshow - Top Airing (Head images) */}
      <div className="top" ref={cardContainerRef}>
        <div className="head">
          {head.slice(0, 8).map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={`Head Slide ${index + 1}`}
              className={currentIndexHead === index ? "active" : "inactive"}
              style={{
                opacity: currentIndexHead === index ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
              }}
            />
          ))}
        </div>
      </div>

      <div className="card-container">
        {currentItems.map((slide, index) => (
          <div key={index} className="card-wrapper">
            <div className="card">
              <div className="card-image">
                <img src={slide.image} alt={slide.title} className="card-img" />
                <h1 className="title">{slide.title}</h1>
              </div>
              <div className="card-hover">
                <h1 className="card-title">{slide.title}</h1>
                <p className="card-rating">⭐ 9.0</p>
                <p className="card-duration">24 min per ep.</p>
                <p className="card-description">{slide.description}</p>
                <p className="card-status">
                  <strong>Status:</strong> Ongoing
                </p>
                <p className="card-genre">
                  <strong>Genres:</strong> Action, Adventure, Fantasy
                </p>
                <p className="card-studio">
                  <strong>Studio:</strong> Ufotable
                </p>
                <div className="wrappers">
                  <div className="content">
                    <span className="cta" href="#">
                      <span>More Details</span>
                      <span>
                        <svg
                          width="30px"
                          height="20px"
                          viewBox="0 0 66 43"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <path
                              className="one"
                              d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                              fill="#FFFFFF"
                            ></path>
                            <path
                              className="two"
                              d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                              fill="#FFFFFF"
                            ></path>
                            <path
                              className="three"
                              d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                              fill="#FFFFFF"
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="pagination">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {getPaginationRange().map((page) => (
            <button
              key={page}
              onClick={() => changePage(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          ))}
          {currentPage + maxVisibleButtons / 2 < totalPages && (
            <span>...</span> // Indicate more pages
          )}
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-container">
          {/* Anime Categories */}
          <h1>Top Anime List</h1>
          <div className="anime-categories-row">
            <div className="category">
              <h4>Shonen</h4>
              <div>1. Attack on Titan</div>
              <div>2. Naruto</div>
              <div>3. One Piece</div>
              <div>4. Demon Slayer</div>
              <div>5. My Hero Academia</div>
            </div>
            <div className="category">
              <h4>Seinen</h4>
              <div>1. Vinland Saga</div>
              <div>2. Tokyo Revengers</div>
              <div>3. Cowboy Bebop</div>
              <div>4. Berserk</div>
              <div>5. Monster</div>
            </div>
            <div className="category">
              <h4>Fantasy</h4>
              <div>1. Sword Art Online</div>
              <div>2. Black Clover</div>
              <div>3. Re:Zero</div>
              <div>4. Fairy Tail</div>
              <div>5. Dr. Stone</div>
            </div>
            <div className="category">
              <h4>Classic</h4>
              <div>1. Death Note</div>
              <div>2. Fullmetal Alchemist</div>
              <div>3. Hunter x Hunter</div>
              <div>4. Code Geass</div>
              <div>5. Bleach</div>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="footer-sections-row">
            {/* Top Websites */}
            <div className="footer-section">
              <h3>Top Websites</h3>
              <div><a href="https://www.crunchyroll.com" target="_blank" rel="noreferrer">Crunchyroll</a></div>
              <div><a href="https://www.funimation.com" target="_blank" rel="noreferrer">Funimation</a></div>
              <div><a href="https://www.netflix.com" target="_blank" rel="noreferrer">Netflix</a></div>
              <div><a href="https://www.hulu.com" target="_blank" rel="noreferrer">Hulu</a></div>
              <div><a href="https://www.amazon.com/prime-video" target="_blank" rel="noreferrer">Prime Video</a></div>
            </div>

            {/* Contact Information */}
            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>Email: support@subanime.com</p>
              <p>Phone: +1-234-567-890</p>
              <p>Address: 123 Anime St, Tokyo, Japan</p>
            </div>

            {/* Social Media Links */}
            <div className="footer-section">
              <h3>Follow Us</h3>
              <div className="social-media-icons">
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1000px-Instagram_logo_2022.svg.png" alt="Instagram" />
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png" alt="Facebook" />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="Twitter" />
                </a>
                <a href="https://www.Reddit.com" target="_blank" rel="noreferrer">
                  <img src="https://as1.ftcdn.net/jpg/03/16/75/24/1000_F_316752482_SmCu3yMoMV7rMensP4IWCIx3FRrjNKvg.jpg" alt="Reddit" />
                </a>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="footer-section">
              <h3>Stay Updated</h3>
              <p>Subscribe to our newsletter for the latest anime updates and news.</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Enter your email" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="quick-links">
              <a href="/about">About Us</a> |
              <a href="/privacy-policy">Privacy Policy</a> |
              <a href="/terms">Terms of Service</a> |
              <a href="/feedback">Feedback</a>
            </div>
            <p>&copy; {new Date().getFullYear()} SubAnime. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};


export default App;
