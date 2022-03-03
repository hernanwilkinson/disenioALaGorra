'From Cuis 5.0 [latest update: #4383] on 27 September 2020 at 7:33:22 pm'!
'Description '!
!provides: 'Rot13-DisenioALaGorra' 1 1!
SystemOrganization addCategory: 'Rot13-DisenioALaGorra'!


!classDefinition: #Rot13Test category: 'Rot13-DisenioALaGorra'!
TestCase subclass: #Rot13Test
	instanceVariableNames: ''
	classVariableNames: ''
	poolDictionaries: ''
	category: 'Rot13-DisenioALaGorra'!
!classDefinition: 'Rot13Test class' category: 'Rot13-DisenioALaGorra'!
Rot13Test class
	instanceVariableNames: ''!


!Rot13Test methodsFor: 'tests' stamp: 'HAW 9/23/2020 18:21:36'!
test01EmptyStringIsNotConverted

	self assert: '' equals: '' asRot13! !

!Rot13Test methodsFor: 'tests' stamp: 'HAW 9/23/2020 18:22:24'!
test02FirstCharOfFirstHalfIsConvertedCorrectly

	self assert: 'N' equals: 'A' asRot13! !

!Rot13Test methodsFor: 'tests' stamp: 'HAW 9/23/2020 18:27:07'!
test03MoreThanOneCharAreConvertedCorrectly

	self assert: 'NN' equals: 'AA' asRot13! !

!Rot13Test methodsFor: 'tests' stamp: 'HAW 9/23/2020 18:27:23'!
test04LastCharOfFirstHalfIsConvertedCorrectly

	self assert: 'Z' equals: 'M' asRot13! !

!Rot13Test methodsFor: 'tests' stamp: 'HAW 9/23/2020 18:27:41'!
test05FirstCharOfSecondHalfIsConvertedCorrectly

	self assert: 'A' equals: 'N' asRot13! !

!Rot13Test methodsFor: 'tests' stamp: 'HAW 9/23/2020 18:28:03'!
test06LastCharOfSecondHalfIsConvertedCorrectly

	self assert: 'M' equals: 'Z' asRot13! !

!Rot13Test methodsFor: 'tests' stamp: 'HAW 9/23/2020 18:28:31'!
test07CharsAfterLastCharAreNotConverted

	self assert: '[' equals: '[' asRot13! !

!Rot13Test methodsFor: 'tests' stamp: 'HAW 9/23/2020 18:28:43'!
test08CharsBeforeFirstCharAreNotConverted

	self assert: '@' equals: '@' asRot13! !

!Rot13Test methodsFor: 'tests' stamp: 'HAW 9/23/2020 18:29:14'!
test09LowercaseCharInFirstHalfAreConvertedCorreclty

	self assert: 'n' equals: 'a' asRot13! !

!Rot13Test methodsFor: 'tests' stamp: 'HAW 9/23/2020 18:30:17'!
test10LowercaseCharInSecondHalfAreConvertedCorreclty

	self assert: 'a' equals: 'n' asRot13! !

!Rot13Test methodsFor: 'tests' stamp: 'HAW 9/27/2020 19:31:18'!
test11NonEnglishLettersAreNotConverter

	self assert: 'ñ' equals: 'ñ' asRot13! !

!Character methodsFor: '*Rot13-DisenioALaGorra' stamp: 'HAW 9/27/2020 19:30:52'!
asRot13
	
	| selfAsUppercase |
	
	selfAsUppercase := self asUppercase asciiValue.
	(selfAsUppercase between: `$A asciiValue` and: `$M asciiValue`) ifTrue: [ ^Character asciiValue: self asciiValue + 13].
	(selfAsUppercase between: `$N asciiValue` and: `$Z asciiValue`) ifTrue: [ ^Character asciiValue: self asciiValue - 13 ].
	
	^self! !

!String methodsFor: '*Rot13-DisenioALaGorra' stamp: 'HAW 9/15/2020 20:42:49'!
asRot13
	
	^self collect: [ :aCharToConvert | aCharToConvert asRot13 ]! !
