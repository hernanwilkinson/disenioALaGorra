!classDefinition: #FullClosureExample category: #'FullClosure-Example'!
Object subclass: #FullClosureExample
	instanceVariableNames: ''
	classVariableNames: ''
	poolDictionaries: ''
	category: 'FullClosure-Example'!

!FullClosureExample methodsFor: 'examples' stamp: 'HAW 9/8/2020 16:46:51'!
closureCapturingTempVar
"
self new closureCapturingTempVar
"
	
	| counter counterIncrementor |
	
	counter := 0.
	counterIncrementor := [ counter := counter + 1 ].
	
	^counterIncrementor ! !

!FullClosureExample methodsFor: 'examples' stamp: 'HAW 9/8/2020 16:50:58'!
closureCapturingTempVar: anAdder
"
self new closureCapturingTempVar: 2
"
	
	| counter counterIncrementor |
	
	counter := 0.
	counterIncrementor := [ counter := counter + anAdder ].
	
	^counterIncrementor ! !

!FullClosureExample methodsFor: 'examples' stamp: 'HAW 9/8/2020 17:41:05'!
closureWithExplicitReturn
"
self new closureWithExplicitReturn
"
	
	| closure |
	
	closure := [ ^10 ].
	
	^closure value + 5
	
	
	! !

!FullClosureExample methodsFor: 'examples' stamp: 'HAW 9/8/2020 16:45:14'!
closureWithOutExplicitReturn
"
self new closureWithOutExplicitReturn
"
	
	| closure |
	
	closure := [ 10 ].
	
	^closure value + 5! !

!FullClosureExample methodsFor: 'examples' stamp: 'HAW 9/9/2020 19:06:45'!
workspace

| adder1 adder2 adderBy2 adderBy3 example |

example := FullClosureExample new.

adder1 := example closureCapturingTempVar.
adder2 := example closureCapturingTempVar.

adder1 value. 

adder2 value.


adderBy2 := example closureCapturingTempVar: 2.
adderBy3 := example closureCapturingTempVar: 3.

adderBy2 value.

adderBy3 value.
! !
