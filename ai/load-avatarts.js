const fs = require("fs");
const path = require("path");

// Список ссылок на изображения
const imageUrls = [
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/7/7a/Strength_attribute_symbol.png/revision/latest/scale-to-width-down/30?cb=20180323111829",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/f/fe/Alchemist_icon.png/revision/latest/scale-to-width-down/110?cb=20160411210240",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/23/Axe_icon.png/revision/latest/scale-to-width-down/110?cb=20160411211422",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/4/4d/Bristleback_icon.png/revision/latest/scale-to-width-down/110?cb=20160411210744",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/e/ed/Centaur_Warrunner_icon.png/revision/latest/scale-to-width-down/110?cb=20160411210603",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/f/fe/Chaos_Knight_icon.png/revision/latest/scale-to-width-down/110?cb=20160411212259",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d6/Dawnbreaker_icon.png/revision/latest/scale-to-width-down/110?cb=20210410124439",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/4/40/Doom_icon.png/revision/latest/scale-to-width-down/110?cb=20160411212104",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/5/59/Dragon_Knight_icon.png/revision/latest/scale-to-width-down/110?cb=20160411205925",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/b/be/Earth_Spirit_icon.png/revision/latest/scale-to-width-down/110?cb=20160411211247",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/a/a5/Earthshaker_icon.png/revision/latest/scale-to-width-down/110?cb=20160411205323",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/1a/Elder_Titan_icon.png/revision/latest/scale-to-width-down/110?cb=20160411210922",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d3/Huskar_icon.png/revision/latest/scale-to-width-down/110?cb=20160411210201",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/c/c0/Kunkka_icon.png/revision/latest/scale-to-width-down/110?cb=20160411205729",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/a/a2/Legion_Commander_icon.png/revision/latest/scale-to-width-down/110?cb=20190401095109",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/2b/Lifestealer_icon.png/revision/latest/scale-to-width-down/110?cb=20160411211952",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/9/9d/Mars_icon.png/revision/latest/scale-to-width-down/110?cb=20190401094550",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/15/Night_Stalker_icon.png/revision/latest/scale-to-width-down/110?cb=20160411212027",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/e/e0/Ogre_Magi_icon.png/revision/latest/scale-to-width-down/110?cb=20160411215538",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/e/e2/Omniknight_icon.png/revision/latest/scale-to-width-down/110?cb=20160411210119",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/f/f2/Primal_Beast_icon.png/revision/latest/scale-to-width-down/110?cb=20220223230622",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/c/c0/Pudge_icon.png/revision/latest/scale-to-width-down/110?cb=20160411211506",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/7/7e/Slardar_icon.png/revision/latest/scale-to-width-down/110?cb=20161213040814",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/df/Spirit_Breaker_icon.png/revision/latest/scale-to-width-down/110?cb=20160411212138",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/1b/Sven_icon.png/revision/latest/scale-to-width-down/110?cb=20160411205500",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d5/Tidehunter_icon.png/revision/latest/scale-to-width-down/110?cb=20160411211651",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/5/55/Tiny_icon.png/revision/latest/scale-to-width-down/110?cb=20160411205608",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/3/3f/Treant_Protector_icon.png/revision/latest/scale-to-width-down/110?cb=20160411210417",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/c/ce/Tusk_icon.png/revision/latest/scale-to-width-down/110?cb=20160411210826",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/18/Underlord_icon.png/revision/latest/scale-to-width-down/110?cb=20160828140759",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/6/61/Undying_icon.png/revision/latest/scale-to-width-down/110?cb=20160411212333",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/1e/Wraith_King_icon.png/revision/latest/scale-to-width-down/110?cb=20160411211746",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/2d/Agility_attribute_symbol.png/revision/latest/scale-to-width-down/30?cb=20180323111717",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/8/8e/Anti-Mage_icon.png/revision/latest/scale-to-width-down/110?cb=20200916215957",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/0/07/Arc_Warden_icon.png/revision/latest/scale-to-width-down/110?cb=20160411214723",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/5/56/Bloodseeker_icon.png/revision/latest/scale-to-width-down/110?cb=20160411213712",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/a/a6/Bounty_Hunter_icon.png/revision/latest/scale-to-width-down/110?cb=20160411213244",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/c/cb/Clinkz_icon.png/revision/latest/scale-to-width-down/110?cb=20160411214114",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/8/80/Drow_Ranger_icon.png/revision/latest/scale-to-width-down/110?cb=20230816024828",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/9/91/Ember_Spirit_icon.png/revision/latest/scale-to-width-down/110?cb=20170417182614",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/7/73/Faceless_Void_icon.png/revision/latest/scale-to-width-down/110?cb=20240423122615",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/4/4f/Gyrocopter_icon.png/revision/latest/scale-to-width-down/110?cb=20181101233643",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/c/c9/Hoodwink_icon.png/revision/latest/scale-to-width-down/110?cb=20201217205959",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/0/03/Juggernaut_icon.png/revision/latest/scale-to-width-down/110?cb=20160411212710",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/7/7d/Luna_icon.png/revision/latest/scale-to-width-down/110?cb=20160411213209",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/c/cc/Medusa_icon.png/revision/latest/scale-to-width-down/110?cb=20160411214604",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/8/85/Meepo_icon.png/revision/latest/scale-to-width-down/110?cb=20160411214421",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/7/7b/Monkey_King_icon.png/revision/latest/scale-to-width-down/110?cb=20161222035035",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/7/7b/Morphling_icon.png/revision/latest/scale-to-width-down/110?cb=20160411212816",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/6/60/Naga_Siren_icon.png/revision/latest/scale-to-width-down/110?cb=20160411213513",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/8/8e/Phantom_Assassin_icon.png/revision/latest/scale-to-width-down/110?cb=20160411214013",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/8/81/Phantom_Lancer_icon.png/revision/latest/scale-to-width-down/110?cb=20160411212849",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/6/66/Razor_icon.png/revision/latest/scale-to-width-down/110?cb=20160411213830",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/7/7d/Riki_icon.png/revision/latest/scale-to-width-down/110?cb=20160411212958",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/3/36/Shadow_Fiend_icon.png/revision/latest/scale-to-width-down/110?cb=20160411213752",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/a/aa/Slark_icon.png/revision/latest/scale-to-width-down/110?cb=20160411214526",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/5/51/Sniper_icon.png/revision/latest/scale-to-width-down/110?cb=20160411213053",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/f/ff/Spectre_icon.png/revision/latest/scale-to-width-down/110?cb=20160411214336",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/9/9c/Templar_Assassin_icon.png/revision/latest/scale-to-width-down/110?cb=20160411213131",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/5/52/Terrorblade_icon.png/revision/latest/scale-to-width-down/110?cb=20160411214652",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/f/f0/Troll_Warlord_icon.png/revision/latest/scale-to-width-down/110?cb=20160411213539",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/4/40/Ursa_icon.png/revision/latest/scale-to-width-down/110?cb=20160411213321",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/5/5f/Viper_icon.png/revision/latest/scale-to-width-down/110?cb=20161213040756",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/0/09/Weaver_icon.png/revision/latest/scale-to-width-down/110?cb=20160411214233",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/5/56/Intelligence_attribute_symbol.png/revision/latest/scale-to-width-down/30?cb=20180323111753",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/6/67/Ancient_Apparition_icon.png/revision/latest/scale-to-width-down/110?cb=20160411220816",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/27/Crystal_Maiden_icon.png/revision/latest/scale-to-width-down/110?cb=20160411214805",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d7/Death_Prophet_icon.png/revision/latest/scale-to-width-down/110?cb=20160411220408",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/9/97/Disruptor_icon.png/revision/latest/scale-to-width-down/110?cb=20160411215651",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/4/41/Enchantress_icon.png/revision/latest/scale-to-width-down/110?cb=20160411215320",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d7/Grimstroke_icon.png/revision/latest/scale-to-width-down/110?cb=20180831203927",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/2f/Jakiro_icon.png/revision/latest/scale-to-width-down/110?cb=20170507134250",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/b/b9/Keeper_of_the_Light_icon.png/revision/latest/scale-to-width-down/110?cb=20160411215721",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/26/Leshrac_icon.png/revision/latest/scale-to-width-down/110?cb=20160411220559",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/b/bb/Lich_icon.png/revision/latest/scale-to-width-down/110?cb=20160411215954",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/3/35/Lina_icon.png/revision/latest/scale-to-width-down/110?cb=20160411215059",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/b/b8/Lion_icon.png/revision/latest/scale-to-width-down/110?cb=20160411220032",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/1f/Muerta_icon.png/revision/latest/scale-to-width-down/110?cb=20230816024719",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/c/c4/Nature%27s_Prophet_icon.png/revision/latest/scale-to-width-down/110?cb=20160411215241",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/a/a6/Necrophos_icon.png/revision/latest/scale-to-width-down/110?cb=20160411220233",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/7/72/Oracle_icon.png/revision/latest/scale-to-width-down/110?cb=20160411215824",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/10/Outworld_Destroyer_icon.png/revision/latest/scale-to-width-down/110?cb=20160411220923",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/13/Puck_icon.png/revision/latest/scale-to-width-down/110?cb=20160411214839",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/c/cd/Pugna_icon.png/revision/latest/scale-to-width-down/110?cb=20160411220442",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/a/a1/Queen_of_Pain_icon.png/revision/latest/scale-to-width-down/110?cb=20160411220334",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/8/8a/Rubick_icon.png/revision/latest/scale-to-width-down/110?cb=20160411215614",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/f/f3/Shadow_Demon_icon.png/revision/latest/scale-to-width-down/110?cb=20160411220956",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/9/96/Shadow_Shaman_icon.png/revision/latest/scale-to-width-down/110?cb=20160411215130",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/9/9f/Silencer_icon.png/revision/latest/scale-to-width-down/110?cb=20160411215503",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/b/bf/Skywrath_Mage_icon.png/revision/latest/scale-to-width-down/110?cb=20160411215753",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/13/Storm_Spirit_icon.png/revision/latest/scale-to-width-down/110?cb=20160411214914",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d1/Tinker_icon.png/revision/latest/scale-to-width-down/110?cb=20160411215201",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/3/3f/Warlock_icon.png/revision/latest/scale-to-width-down/110?cb=20160411220306",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/3/33/Witch_Doctor_icon.png/revision/latest/scale-to-width-down/110?cb=20160411220105",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/3/3f/Zeus_icon.png/revision/latest/scale-to-width-down/110?cb=20160411215025",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/1c/Universal_attribute_symbol.png/revision/latest/scale-to-width-down/30?cb=20230501030320",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/26/Abaddon_icon.png/revision/latest/scale-to-width-down/110?cb=20210125060638",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/c/c3/Bane_icon.png/revision/latest/scale-to-width-down/110?cb=20160411215925",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/f/f2/Batrider_icon.png/revision/latest/scale-to-width-down/110?cb=20160411220708",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d9/Beastmaster_icon.png/revision/latest/scale-to-width-down/110?cb=20160411205834",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/1e/Brewmaster_icon.png/revision/latest/scale-to-width-down/110?cb=20160411210333",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/df/Broodmother_icon.png/revision/latest/scale-to-width-down/110?cb=20160411214142",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/6/61/Chen_icon.png/revision/latest/scale-to-width-down/110?cb=20160411215432",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d8/Clockwerk_icon.png/revision/latest/scale-to-width-down/110?cb=20160411210004",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/c/c5/Dark_Seer_icon.png/revision/latest/scale-to-width-down/110?cb=20160411220632",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/3/3c/Dark_Willow_icon.png/revision/latest/scale-to-width-down/110?cb=20180831204518",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/e/e6/Dazzle_icon.png/revision/latest/scale-to-width-down/110?cb=20160411220519",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/f/f7/Enigma_icon.png/revision/latest/scale-to-width-down/110?cb=20160411220156",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/0/00/Invoker_icon.png/revision/latest/scale-to-width-down/110?cb=20160411220849",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/8/8d/Io_icon.png/revision/latest/scale-to-width-down/110?cb=20160411210451",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/5/5d/Lone_Druid_icon.png/revision/latest/scale-to-width-down/110?cb=20160411213427",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d6/Lycan_icon.png/revision/latest/scale-to-width-down/110?cb=20160411212224",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/b/ba/Magnus_icon.png/revision/latest/scale-to-width-down/110?cb=20160411212403",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/12/Marci_icon.png/revision/latest/scale-to-width-down/110?cb=20211029000514",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/12/Mirana_icon.png/revision/latest/scale-to-width-down/110?cb=20160411212744",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/f/fa/Nyx_Assassin_icon.png/revision/latest/scale-to-width-down/110?cb=20160411214454",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/4/4e/Pangolier_icon.png/revision/latest/scale-to-width-down/110?cb=20180831204401",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/14/Phoenix_icon.png/revision/latest/scale-to-width-down/110?cb=20160411211344",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/7/79/Sand_King_icon.png/revision/latest/scale-to-width-down/110?cb=20160411211544",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/7/7a/Snapfire_icon.png/revision/latest/scale-to-width-down/110?cb=20230816025918",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/f/fa/Techies_icon.png/revision/latest/scale-to-width-down/110?cb=20160411215855",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/9/9a/Timbersaw_icon.png/revision/latest/scale-to-width-down/110?cb=20160411210643",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/20/Vengeful_Spirit_icon.png/revision/latest/scale-to-width-down/110?cb=20160411212927",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/25/Venomancer_icon.png/revision/latest/scale-to-width-down/110?cb=20160411213902",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/9/9e/Visage_icon.png/revision/latest/scale-to-width-down/110?cb=20160411221032",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/9/99/Void_Spirit_icon.png/revision/latest/scale-to-width-down/110?cb=20210413204208",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/6/60/Windranger_icon.png/revision/latest/scale-to-width-down/110?cb=20160411214951",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/4/4a/Winter_Wyvern_icon.png/revision/latest/scale-to-width-down/110?cb=20160411221057",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/0/05/Abrams_Hero_icon.png/revision/latest/scale-to-width-down/110?cb=20240621123628",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/c/cd/Bebop_Hero_icon.png/revision/latest/scale-to-width-down/110?cb=20240621123817",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/27/Dynamo_Hero_icon.png/revision/latest/scale-to-width-down/110?cb=20240621123953",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/f/f0/Grey_Talon_Hero_icon.png/revision/latest/scale-to-width-down/110?cb=20240621162556",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d1/Haze_Hero_icon.png/revision/latest/scale-to-width-down/110?cb=20240621162653",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/6/62/Infernus_Hero_icon.png/revision/latest/scale-to-width-down/110?cb=20240621162751",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/a/a5/Ivy_Hero_icon.png/revision/latest/scale-to-width-down/110?cb=20240621163709",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/4/4b/Kelvin_Hero_icon.png/revision/latest/scale-to-width-down/110?cb=20240621163727",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/7/77/Lady_Geist_Hero_icon.png/revision/latest/scale-to-width-down/110?cb=20240621163746",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/e/e4/Lash_Hero_icon.png/revision/latest/scale-to-width-down/110?cb=20240621163800",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/5/59/Mcginnis_Hero_icon.png/revision/latest/scale-to-width-down/110?cb=20240621163825",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/6/64/Mo_and_Krill_Hero_icon.png/revision/latest/scale-to-width-down/110?cb=20240621163840",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/0/0e/Paradox_Hero_icon.png/revision/latest/scale-to-width-down/110?cb=20240621163842",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/1f/Pocket_Hero_icon.png/revision/latest/scale-to-width-down/110?cb=20240621163904",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/3/33/Unknown_Hero_icon.png/revision/latest/scale-to-width-down/110?cb=20111006215536",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/4/47/Seven_Hero_icon.png/revision/latest/scale-to-width-down/110?cb=20240621163923",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/5/53/Vindicta_Hero_icon.png/revision/latest/scale-to-width-down/110?cb=20240621163925",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/e/ec/Warden_Hero_icon.png/revision/latest/scale-to-width-down/110?cb=20240621163929",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/3/33/Wraith_Hero_icon.png/revision/latest/scale-to-width-down/110?cb=20240621163935",
  "https://static.wikia.nocookie.net/dota2_gamepedia/images/b/bd/Yamato_Hero_icon.png/revision/latest/scale-to-width-down/110?cb=20240621163939",
];

// Папка для сохранения изображений
const downloadFolder = path.join(__dirname, "heroes-avatars-origins");

// Создаем папку, если она не существует
if (!fs.existsSync(downloadFolder)) {
  fs.mkdirSync(downloadFolder);
}

// Функция для извлечения имени файла из URL
function extractHeroesName(url) {
  const match = url.match(/\/([^\/]+)_icon\.png/);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

// Функция для скачивания изображения
async function downloadImage(url, filename) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка при скачивании ${url}: ${response.statusText}`);
  }

  const buffer = await response.arrayBuffer();
  fs.writeFileSync(path.join(downloadFolder, filename), Buffer.from(buffer));
  console.log(`Скачано: ${filename}`);
}

// Функция для обновления CSV файла
function updateCSV(filename, heroName) {
  const csvFilePath = path.join(__dirname, "heroes-avatars.annotation.csv");
  const csvLine = `${path.join(downloadFolder, filename)},${heroName}\n`;

  // Проверяем, существует ли файл, и если нет, создаем его с заголовком
  if (!fs.existsSync(csvFilePath)) {
    fs.writeFileSync(csvFilePath, "Путь до аватара,Имя героя\n");
  }

  // Добавляем новую строку в файл
  fs.appendFileSync(csvFilePath, csvLine);
}

// Скачиваем все изображения
async function downloadAllImages() {
  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    const heroesName = extractHeroesName(url);
    if (!heroesName) {
      console.error(`Не удалось извлечь имя героя из URL: ${url}`);
      continue;
    }
    await downloadImage(url, heroesName + ".png");

    updateCSV(heroesName + ".png", heroesName);
  }
}

// Запускаем скачивание
downloadAllImages().then(() => {
  console.log("Все изображения скачаны и сохранены.");
});
