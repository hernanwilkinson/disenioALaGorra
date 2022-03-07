'From Cuis 6.0 [latest update: #5062] on 7 March 2022 at 5:30:23 pm'!
!classDefinition: #ALaGorraVariables category: 'Diseño a la Gorra'!
Object subclass: #ALaGorraVariables
	instanceVariableNames: ''
	classVariableNames: ''
	poolDictionaries: ''
	category: 'Diseño a la Gorra'!

"-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- "!

!classDefinition: 'ALaGorraVariables class' category: 'Diseño a la Gorra'!
ALaGorraVariables class
	instanceVariableNames: ''!

!ALaGorraVariables class methodsFor: 'examples' stamp: 'HAW 3/7/2022 17:30:12'!
sameVarAssignedInClosure

	"
	self sameVarAssignedInClosure
	"
	| temp1 closure |
	
	temp1 := 1.
	
	closure := [
		temp1 := 10.
		temp1 + 2 ].

	^{ closure value. temp1 }! !

!ALaGorraVariables class methodsFor: 'examples' stamp: 'HAW 3/2/2022 16:58:04'!
varDefinedBeforeClosure

	"
	self varDefinedBeforeClosure
	"
	| temp1 |
	
	temp1 := 1.
	
	^[ temp1 + 2 ] value! !
