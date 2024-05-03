export enum E_CATEGORIES {
	SCHOOL = 1,
	LEVEL,
	CASTING,
	RANGE,
	TARGET,
	COMPONENTS,
	DURATION,
	CLASS,
	EFFECTS,
}

export const CATEGORY_NAMES: string[] = [
	"null",
	"School",
	"Level",
	"Casting",
	"Range",
	"Target",
	"Components",
	"Duration",
	"Class",
	"Effects",
];

export enum E_SCHOOL_VALUES {
	ABJURATION = 1,
	CONJURATION,
	DIVINATION,
	DUNAMANCY,
	ENCHANTMENT,
	EVOCATION,
	ILLUSION,
	NECROMANCY,
	TRANSMUTATION,
}

export const SCHOOL_NAMES: string[] = [
	"null",
	"Abjuration",
	"Conjuration",
	"Divination",
	"Dunamancy",
	"Enchantment",
	"Evocation",
	"Illusion",
	"Necromancy",
	"Transmutation",
];

export enum E_LEVEL_VALUES {
	FIRST = 1,
	SECOND,
	THIRD,
	FOURTH,
	FIFTH,
	SIXTH,
	SEVENTH,
	EIGTH,
	NINTH,
	CANTRIP,
}

export const LEVEL_NAMES = [
	"null",
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
];

export enum E_CASTING_VALUES {
	ONE_ACTION = 1,
	ONE_REACTION,
	BONUS_ACTION,
	ONE_MINUTE,
	TEN_MINUTES,
	ONE_HOUR,
	ONE_PLUS_HOUR,
}

export const CASTING_NAMES: string[] = [
	"1 Action",
	"1 Reaction",
	"Bonus Action",
	"1 minute",
	"10 minutes",
	"1 hour",
	"1+ hours",
];

export enum E_RANGE_VALUES {
	TOUCH = 1,
	SELF,
	FIVE_FEET,
	TEN_FEET,
	THIRTY_FEET,
	SIXTY_FEET,
	ONE_HUNDRED_TWENTY_FEET,
	ONE_HUNDRED_TWENTY_PLUS_FEET,
}

export const RANGE_NAMES: string[] = [
	"Touch",
	"Self",
	"5 Feet",
	"10 Feet",
	"30 Feet",
	"60 Feet",
	"120 Feet",
	"120+ Feet",
];

export enum E_TARGET_VALUES {
	NULL = 0,
	CREATURE,
	OBJECT,
	AREA,
	POINT,
	UNNOCUPIED_SPACE,
}

export const TARGET_NAMES: string[] = [
	"null",
	"Creature",
	"Object",
	"Area",
	"Point",
	"Unnocupied Space",
];

export enum E_COMPONENT_VALUES {
	V = 1,
	S,
	M,
}

export const COMPONENT_NAMES: string[] = ["null", "V", "S", "M"];

export enum E_DURATION_VALUES {
	INSTANTANEOUS = 1,
	ONE_ROUND,
	ONE_MINUTE,
	TEN_MINUTES,
	ONE_HOUR,
	EIGHT_HOURS,
	EIGHT_PLUS_HOURS,
	UNTIL_DISPELLED,
}

export const DURATION_NAMES: string[] = [
	"null",
	"Instantaneous",
	"1 Round",
	"1 Minute",
	"10 Minutes",
	"1 Hour",
	"8 Hours",
	"8+ Hours",
	"Until Dispelled",
];

export const enum E_CLASS_VALUES {
	ARTIFICER = 1,
	BARD,
	CLERIC,
	DRUID,
	PALADIN,
	RANGER,
	SORCERER,
	WARLOCK,
	WIZARD,
}

export const CLASS_NAMES: string[] = [
	"null",
	"Artificer",
	"Bard",
	"Cleric",
	"Druid",
	"Paladin",
	"Ranger",
	"Sorcerer",
	"Warlock",
	"Wizard",
];

export enum E_EFFECT_VALUES {
	Damage = 1,
	Healing,
	HP,
	AC,
	AoE,
	Condition,
	Buff,
	Debuff,
	Ability_Score,
	Check,
	Saving_Throw,
	Advantage,
	Disadvantage,
	Resistance,
	Terrain,
	Living,
	Non_Living,
	Utility,
	Location,
	Movement,
	Find,
	Hide,
	Send,
	Control,
	Create,
	Summon,
	Ask,
	Creature_Type,
	Options,
	Change,
	Choose,
	Multiple,
	Upcast,
	Leveling,
	Melee,
	Weapon,
	Acid,
	Bludgeoning,
	Cold,
	Fire,
	Force,
	Lightning,
	Necrotic,
	Piercing,
	Poison,
	Psychic,
	Radiant,
	Slashing,
	Thunder,
}

export const EFFECT_NAMES: string[] = [
	"Null",
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
];

export type T_CATEGORY_INFO = {
	SCHOOL: T_CATEGORY;
	LEVEL: T_CATEGORY;
	CASTING: T_CATEGORY;
	RANGE: T_CATEGORY;
	TARGET: T_CATEGORY;
	COMPONENTS: T_CATEGORY;
	DURATION: T_CATEGORY;
	CLASS: T_CATEGORY;
	EFFECTS: T_CATEGORY;
};

export type T_CATEGORY = {
	name: string;
};
