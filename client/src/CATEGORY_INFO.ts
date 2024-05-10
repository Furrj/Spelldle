import { T_CATEGORY_INFO } from "./types";

const CATEGORY_INFO: T_CATEGORY_INFO = {
	SCHOOL: {
		name: "School",
		values: [
			"Abjuration",
			"Conjuration",
			"Divination",
			"Dunamancy",
			"Enchantment",
			"Evocation",
			"Illusion",
			"Necromancy",
			"Transmutation",
		],
	},
	LEVEL: {
		name: "Level",
		values: [
			"1st",
			"2nd",
			"3rd",
			"4th",
			"5th",
			"6th",
			"7th",
			"8th",
			"9th",
			"Cantrip",
		],
	},
	CASTING: {
		name: "Casting",
		values: [
			"1 Action",
			"1 Reaction",
			"Bonus Action",
			"1 minute",
			"10 minutes",
			"1 hour",
			"1+ hours",
		],
	},
	RANGE: {
		name: "Range",
		values: [
			"Touch",
			"Self",
			"5 Feet",
			"10 Feet",
			"30 Feet",
			"60 Feet",
			"120 Feet",
			"120+ Feet",
		],
	},
	TARGET: {
		name: "Target",
		values: ["Creature", "Object", "Area", "Point", "Unnocupied Space"],
	},
	COMPONENTS: {
		name: "Components",
		values: ["V", "S", "M"],
	},
	DURATION: {
		name: "Duration",
		values: [
			"Instantaneous",
			"1 Round",
			"1 Minute",
			"10 Minutes",
			"1 Hour",
			"8 Hours",
			"8+ Hours",
			"Until Dispelled",
		],
	},
	CLASS: {
		name: "Class",
		values: [
			"Artificer",
			"Bard",
			"Cleric",
			"Druid",
			"Paladin",
			"Ranger",
			"Sorcerer",
			"Warlock",
			"Wizard",
		],
	},
	EFFECTS: {
		name: "Effects",
		values: [
			"Damage",
			"Healing",
			"HP",
			"AC",
			"AoE",
			"Condition",
			"Buff",
			"Debuff",
			"Ability Score",
			"Check",
			"Saving Throw",
			"Advantage",
			"Disadvantage",
			"Resistance",
			"Terrain",
			"Living",
			"Non Living",
			"Utility",
			"Location",
			"Movement",
			"Find",
			"Hide",
			"Send",
			"Control",
			"Create",
			"Summon",
			"Ask",
			"Creature_Type",
			"Options",
			"Change",
			"Choose",
			"Multiple",
			"Upcast",
			"Leveling",
			"Melee",
			"Weapon",
			"Acid",
			"Bludgeoning",
			"Cold",
			"Fire",
			"Force",
			"Lightning",
			"Necrotic",
			"Piercing",
			"Poison",
			"Psychic",
			"Radiant",
			"Slashing",
			"Thunder",
		],
	},
};

export default CATEGORY_INFO;
