package testHelpers

import "spelldle.com/server/shared/types"

var TestGuess = types.GuessAllInfo{
	GameSessionID: "TEST",
	Round:         1,
	SpellCategories: types.SpellCategories{
		Components: []int{1, 2},
		Class:      []int{3, 4, 5},
		Effects:    []int{6, 7, 8, 9},
		Level: types.SpellLevel{
			Level:    1,
			IsRitual: false,
		},
		School:      0,
		CastingTime: 1,
		Range:       2,
		Target:      3,
		Duration:    4,
	},
}