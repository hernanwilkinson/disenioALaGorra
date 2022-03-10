!classDefinition: #ALaGorraClosure category: 'Diseño a la Gorra'!
Object subclass: #ALaGorraClosure
	instanceVariableNames: ''
	classVariableNames: ''
	poolDictionaries: ''
	category: 'Diseño a la Gorra'!

"-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- "!

!classDefinition: 'ALaGorraClosure class' category: 'Diseño a la Gorra'!
ALaGorraClosure class
	instanceVariableNames: ''!

!ALaGorraClosure class methodsFor: 'examples - closures' stamp: 'HAW 3/7/2022 19:32:16'!
exampleDo

	| numbers even |
	
	numbers := {1. 2. 3. 4. 5. }. "Es lo mismo que 1 to: 5"
	even := OrderedCollection new.
	
	"for (int i=0;i<number.length;i++) ..."
	1 to: numbers size do: [ :index | (numbers at: index) even ifTrue: [ even add: (numbers at: index)]].
	
	"for (number: numbers) ..."
	numbers do: [ :aNumber | aNumber even ifTrue: [ even add: aNumber ]].
	 
	numbers withIndexDo: [ :index :aNumber | aNumber even ifTrue: [ even add: aNumber ]].
	
	! !

!ALaGorraClosure class methodsFor: 'examples - closures' stamp: 'HAW 3/7/2022 17:41:40'!
exampleSelect

	| numbers even names withP |
	
	numbers := {1. 2. 3. 4. 5. }. "Es lo mismo que 1 to: 5"
	even := numbers select: [:aNumber | aNumber even ].
	
	"----------"
	names := { 'Maria'. 'Juan'. 'Pedro'. 'Pepe'. 'Beatriz' }.
	withP := names select: [ :eachName | eachName includes: $P ].
	
	^{ even. withP }! !


!ALaGorraClosure class methodsFor: 'examples - same sintax' stamp: 'HAW 3/9/2022 16:11:52'!
exampleFor

	| numbers |
	
	numbers := {1. 2. 3. 4. 5. }. 
	
	1 to: numbers size do: [ :i | Transcript print: (numbers at: i); newLine ].
	
	numbers do: [ :number | Transcript print: number; newLine ]! !

!ALaGorraClosure class methodsFor: 'examples - same sintax' stamp: 'HAW 3/9/2022 20:35:41'!
exampleIf: args
"
	self exampleSameSintax1: nil.
	self exampleSameSintax1: {1. 2. 3}.
"

	| optionalArgs x |
	
	x :=  [ Transcript print: args size ].
	args isNil
		ifTrue: self m1
		ifFalse: x.
		
	optionalArgs := Optional ofNullable: args.
	optionalArgs 
		ifPresent: x
		orElse: self m1! !

!ALaGorraClosure class methodsFor: 'examples - same sintax' stamp: 'HAW 3/9/2022 16:11:40'!
exampleWhile

	| numbers indice |
	
	numbers := {1. 2. 3. 4. 5. }. 
	indice := 1.

	[ indice <= numbers size ] whileTrue: [ 
		Transcript print: (numbers at: indice); newLine.
		indice := indice + 1 ].! !

!ALaGorraClosure class methodsFor: 'examples - same sintax' stamp: 'HAW 3/9/2022 20:35:18'!
m1

	^ [ Transcript print: 'sin argumentos' ]! !


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


!classDefinition: #Address category: 'Diseño a la Gorra'!
Object subclass: #Address
	instanceVariableNames: 'streetName streetNumber town'
	classVariableNames: ''
	poolDictionaries: ''
	category: 'Diseño a la Gorra'!

!Address methodsFor: 'initialization' stamp: 'HAW 3/8/2022 16:26:16'!
initializeAt: aStreetName number: aStreetNumber in: aTown 
	
	streetName := aStreetName.
	streetNumber := aStreetNumber.
	town := aTown.! !


!Address methodsFor: 'testing' stamp: 'HAW 3/8/2022 16:30:41'!
isAt: aStreetName 
	
	^streetName sameAs: aStreetName ! !


!Address methodsFor: 'printing' stamp: 'HAW 3/8/2022 16:34:20'!
printOn: aStream

	aStream
		nextPutAll: 'Street: ';
		nextPutAll: streetName;
		nextPutAll: ' Number: ';
		print: streetNumber;
		nextPutAll: ' Town: ';
		nextPutAll: town ! !

"-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- "!

!classDefinition: 'Address class' category: 'Diseño a la Gorra'!
Address class
	instanceVariableNames: ''!

!Address class methodsFor: 'instance creation' stamp: 'HAW 3/8/2022 16:26:09'!
at: aStreetName number: aStreetNumber in: aTown 
	
	^self new initializeAt: aStreetName number: aStreetNumber in: aTown ! !


!classDefinition: #Customer category: 'Diseño a la Gorra'!
Object subclass: #Customer
	instanceVariableNames: 'name address'
	classVariableNames: ''
	poolDictionaries: ''
	category: 'Diseño a la Gorra'!

!Customer methodsFor: 'initialization' stamp: 'HAW 3/8/2022 16:26:37'!
initializeNamed: aName at: anAddress 
	
	name := aName.
	address := anAddress.! !


!Customer methodsFor: 'address' stamp: 'HAW 3/9/2022 14:35:42'!
addressIfNone: aNoneBlock

	^address ifNil: aNoneBlock 
	"También podría:
	self ifHasAddress: [ :providedAddress | providedAddress ] IfNot: aNoneBlock "! !

!Customer methodsFor: 'address' stamp: 'HAW 3/10/2022 16:55:20'!
ifHasAddress: aPresentBlock IfNot: aNotPresentBlock

	^address ifNil: aNotPresentBlock ifNotNil: aPresentBlock ! !


!Customer methodsFor: 'testing' stamp: 'HAW 3/10/2022 16:55:42'!
isAt: aStreetName 
	
	^self 
		ifHasAddress: [ :providedAddress | providedAddress isAt: aStreetName ] 
		IfNot: [ false ]. 
		
"Esta est otra manera de hacerlo, usando non local return

	| providedAddress |
	
	providedAddress := self addressIfNone: [ ^false ].
	
	^providedAddress isAt: aStreetName 
"! !

"-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- "!

!classDefinition: 'Customer class' category: 'Diseño a la Gorra'!
Customer class
	instanceVariableNames: ''!

!Customer class methodsFor: 'examples' stamp: 'HAW 3/8/2022 16:34:04'!
example

	"
	self example
	"
	| withAddress withoutAddress |
	
	withAddress := Customer named: 'Pepe' at: (Address at: 'San Martín' number: 11 in: 'Florida').
	withoutAddress := Customer named: 'Pepe'.
	
	Transcript print: (withAddress isAt: 'San Martín'); newLine.
	Transcript print: (withAddress isAt: 'Maipú'); newLine.
	Transcript print: (withoutAddress isAt: 'San Martín'); newLine.
	
	Transcript show: (withAddress addressIfNone: [ 'Without Address' ]); newLine.
	Transcript show: (withoutAddress addressIfNone: [ 'Without Address' ]); newLine.
	
	! !


!Customer class methodsFor: 'instance creation' stamp: 'HAW 3/8/2022 16:27:01'!
named: aName 
	
	^self named: aName at: nil! !

!Customer class methodsFor: 'instance creation' stamp: 'HAW 3/8/2022 16:26:30'!
named: aName at: anAddress 
	
	^self new initializeNamed: aName at: anAddress ! !


!classDefinition: #CustomerWithGenericNil category: 'Diseño a la Gorra'!
Object subclass: #CustomerWithGenericNil
	instanceVariableNames: 'name address'
	classVariableNames: ''
	poolDictionaries: ''
	category: 'Diseño a la Gorra'!

!CustomerWithGenericNil methodsFor: 'initialization' stamp: 'HAW 3/8/2022 16:39:59'!
initializeNamed: aName at: anAddress 
	
	name := aName.
	address := anAddress.! !


!CustomerWithGenericNil methodsFor: 'address' stamp: 'HAW 3/8/2022 16:40:50'!
address

	^address ! !


!CustomerWithGenericNil methodsFor: 'testing' stamp: 'HAW 3/8/2022 16:41:07'!
isAt: aStreetName 
	
	^address isAt: aStreetName ! !

"-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- "!

!classDefinition: 'CustomerWithGenericNil class' category: 'Diseño a la Gorra'!
CustomerWithGenericNil class
	instanceVariableNames: ''!

!CustomerWithGenericNil class methodsFor: 'examples' stamp: 'HAW 3/8/2022 16:40:41'!
example

	"
	self example
	"
	| withAddress withoutAddress |
	
	withAddress := CustomerWithGenericNil named: 'Pepe' at: (Address at: 'San Martín' number: 11 in: 'Florida').
	withoutAddress := CustomerWithGenericNil named: 'Pepe'.
	
	Transcript print: (withAddress isAt: 'San Martín'); newLine.
	Transcript print: (withAddress isAt: 'Maipú'); newLine.
	Transcript print: (withoutAddress isAt: 'San Martín'); newLine.
	
	Transcript show: withAddress address; newLine.
	Transcript show: withoutAddress address; newLine.
	
	! !


!CustomerWithGenericNil class methodsFor: 'instance creation' stamp: 'HAW 3/8/2022 16:40:08'!
named: aName 
	
	^self named: aName at: GenericNil new! !

!CustomerWithGenericNil class methodsFor: 'instance creation' stamp: 'HAW 3/8/2022 16:39:59'!
named: aName at: anAddress 
	
	^self new initializeNamed: aName at: anAddress ! !


!classDefinition: #Optional category: 'Diseño a la Gorra'!
Object subclass: #Optional
	instanceVariableNames: 'value'
	classVariableNames: ''
	poolDictionaries: ''
	category: 'Diseño a la Gorra'!

!Optional methodsFor: 'control flow' stamp: 'HAW 3/9/2022 16:06:33'!
ifPresent: presentBlock orElse: elseBlock

	^value isNil
		ifTrue: elseBlock 
		ifFalse: presentBlock ! !


!Optional methodsFor: 'initialization' stamp: 'HAW 3/9/2022 16:08:02'!
initializeValue: aValue 
	
	value := aValue.! !

"-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- "!

!classDefinition: 'Optional class' category: 'Diseño a la Gorra'!
Optional class
	instanceVariableNames: ''!

!Optional class methodsFor: 'instance creation' stamp: 'HAW 3/9/2022 16:05:40'!
ofNullable: aValue

	^self new initializeValue: aValue! !


!classDefinition: #GenericNil category: 'Diseño a la Gorra'!
ProtoObject subclass: #GenericNil
	instanceVariableNames: ''
	classVariableNames: ''
	poolDictionaries: ''
	category: 'Diseño a la Gorra'!

!GenericNil methodsFor: 'printing' stamp: 'HAW 3/8/2022 16:57:18'!
asString

	^self printString! !

!GenericNil methodsFor: 'printing' stamp: 'HAW 3/8/2022 16:50:04'!
printOn: aStream

	aStream nextPutAll: 'genericNil'! !

!GenericNil methodsFor: 'printing' stamp: 'HAW 3/8/2022 16:58:08'!
printString

	^String streamContents: [:stream | self printOn: stream ]! !

!GenericNil methodsFor: 'printing' stamp: 'HAW 3/8/2022 16:49:23'!
printText
	^ Text streamContents: [:aStream| self printOn: aStream]! !


!GenericNil methodsFor: 'system primitives' stamp: 'HAW 3/8/2022 16:54:41'!
doesNotUnderstand: aMessage

	^self ! !

!GenericNil methodsFor: 'system primitives' stamp: 'HAW 3/8/2022 16:45:09'!
inspectorClass
	"Answer the class of the inspector to be used on the receiver.  Called by inspect; 
	use basicInspect to get a normal (less useful) type of inspector."

	^ Inspector! !

!GenericNil methodsFor: 'system primitives' stamp: 'HAW 3/8/2022 16:47:43'!
instVarAt: index put: anObject
	"Primitive. Store a value into a fixed variable in an object. The numbering of the
	 variables corresponds to the named instance variables, followed by the indexed
	 instance variables. Fail if the index is not an Integer or is not the index of a fixed
	 variable. Essential. See Object documentation whatIsAPrimitive."

	<primitive: 174 error: ec>
	Object primitiveFailed! !

!GenericNil methodsFor: 'system primitives' stamp: 'HAW 3/8/2022 16:43:35'!
mustBeBoolean

	^false! !

!GenericNil methodsFor: 'system primitives' stamp: 'HAW 3/8/2022 16:53:37'!
mustBeBooleanIn: context

	context skipBackBeforeJump.
	^false! !
