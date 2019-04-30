Documentation for the selectScene macro (copyright Andrew Svedby 2018,
licensed under same license as Perverted Education)

"Real programmers don't comment their code. If it was hard to write, it should be hard to understand." - Anon

It should however not be hard to use :-)

How to easily manage random or sequential events.

An example from 'Snoop in guardian bedroom.twee'

<<selectScene snoopItems RND>>\
	<<scene>>You rummage around for a while, then hear what could be $guardian moving around in the house. You stop what you're doing, despite not having found anything interesting.
	<<scene>>You rummage around briefly, then hear what could be $guardian talking on a phone. You stop what you're doing, sadly you haven't found anything interesting yet.
	<<scene>>You look for something interesting. After a while, you hear what could be TV . You stop what you're doing trying to calm down your thundering heart.
	<<scene>>You rummage through her things for a while, then hear what could be $guardian walking by the door. You instantly freeze, afraid to be caught.
<</selectScene>>\

Whenever this is run, it will randomly choose one of the <<scene>> and
display it. It will remember the choosen <<scene>> and the next time
it is run, it will avoid choosing the same <<scene>> agian.

This is often the desiered behavior as the player will not be as
immersed if they get exactly the same text the next time.

If there is only two (or one) <<scene>>, it will choose randomly from
the scenes withouth this test. This is to avoid it ping-pong'ing
between the two scenes.

Lets look at the fist line: <<selectScene snoopItem RND>>

'snoopItem' is the identifier. It is where the state of the
<<selectScene>> is stored so if there are more then one
<<selectScene>> with the same identifier, they will overwrite each
others state and things will not work as they should.

'RND' is the strategy. The strategy can be SEQ, RND, SEQ2RND, and
RND2RND. It tells <<selectScene>> how to choose from the different
<<scene>>.

RND is described above.

For strategy SEQ, <<selectScene>> will display the <<scene>> in
order (first time the first <<scene>>, second time the second
<<scene>> etc.)

Once all <<scene>> have been displayed, it will continue to display
the last <<scene>>

For strategy SEQ2RND, <<selectScene>> will first go through all the
<<scene>> just like with strategy SEQ. After that, it will start to
randomly select <<scene>> just as if strategy was RND.

For strategy RND2RND, <<selectScene>> will first go through all the
<<scene>> in random order. Once all <<scene> has been displayed, it
will start to randomly select <<scene>> just as if strategy was RND.

You can think of it as if <<selectScene>> shuffels all the <<scene>>,
just like a deck of cards. Then it behaves just like SEQ2RND.

For strategies SEQ and RND you can add a <<restIsRandom>> among the
scenes. (RND and <<restIsRandom>> is not yet in PE as of 0.79003)

Example:

<<selectScene test SEQ>>
	<<scene>>AAAA
	<<scene>>BBBB
	<<scene>>CCCC
	<<restIsRandom>>
	<<scene>>RND1
	<<scene>>RND2
	<<scene>>RND3
<</selectScene>>

It will first display AAAA, then BBBB, then CCCC and then it will
select among the rest randomly.

It will behave exatly like this:

<<selectScene test SEQ>>
	<<scene>>AAAA
	<<scene>>BBBB
	<<scene>>CCCC
	<<scene>><<selectScene subTest RND>>
		<<scene>>RND1
		<<scene>>RND2
		<<scene>>RND3
	<</selectScene>>
<</selectScene>>

RND with <<restIsRandom>> behaves slightly differently. It will start
off by shuffeling the <<scene>> before the <<restIsRandom>> and
display them one by one.

In the example above it could be CCCC, AAAA, BBBB, or BBBB, CCCC, AAAA
(or even AAAA, BBBB, CCCC, all shuffles are equally likley).

The scenes after <<restIsRandom>> works the same way as for SEQ with
<<restIsRandom>>.


A <<scene>> can also have a chance/weight value. If no chance value is
given, the default chance is 10.

Example:

<<selectScene Test2 RND>>
	<<scene 20>>Chance 20
	<<scene 30>>Chance 30
	<<scene>>Chance 10
	<<scene 80>>Chance 80
<</selectScene>>

The total chance is 20+30+10+80 = 140

We generate a random number between 1 and 140, lets say 107.

For each scene, remove the chance from that number and stop once is
less then 1.

So for 'Chance 20' remove 20, value is now 87, not less then 1
For 'Chance 30' remove 30, value is now 57, not less then 1
For 'Chance 10' remove 10, value is now 47, not less then 1
For 'Chance 80' remove 80, value is now -33, less then 1.
Sp we display 'Chance 80' and remembers that scene.

Next time we sum up the chance again but exclude 'Chance 80'
Total chance 20+30+10 = 60

Generate a random number between 1 and 60, lets say 27.
That will get us to 'Chance 30', display that scene and remember the scene.

Note: We only remember the last <<scene>> if there are 3 or more scenes.

<<selectScene Test3 RND>>
	<<scene 10>>Not common
	<<scene 90>>Common
<</selectScene>>

This will work as you expect it. 9 out of 10 times 'Common' will be chosen. This is because there are only two <<scene>>

<<selectScene Test3 RND>>
	<<scene 5>>Not common 1
	<<scene 5>>Not common 2
	<<scene 90>>Common
<</selectScene>>

This will not work as you might expect. Once 'Common' is chosen, its
chance is taken out of the calculation and 'Not common 1' or 'Not
common 2' will be choosen. You will most likley end up with the sequence of 'Common', 'Not common 1/2', 'Common', 'Not coomon 1/2' etc..

Either we need to introduce a new strategy RANDOM for this but in the
meantime we can do this:

<<selectScene Test3a RND>>
	<<scene 5>>Not common 1
	<<scene 5>>Not common 2
	<<scene 45>>Common
	<<scene 45>>Common
<</selectScene>>


Chance does not make sense for SEQ (without <<restIsRandom>>).
With <<restIsRandom>>, chance is only allowed below <<restIsRandom>>

With SEQ2RND and RND2RND you can have a chance of zero for a <<scene>>
In the first phase (when we display the <<scene>> on after the other
for SEQ2RND or shuffled for RND2RND), chance is ignored.

It is only used once we get to the random selection phase.

Example:

<<selectScene Test4 RND2RND>>
	<<scene 0>>Long text 1
	<<scene 0>>Long text 2
	<<scene 0>>Long text 3
	<<scene>>Short text 1
	<<scene>>Short text 2
	<<scene>>short text 3
<</selectScene>>

First phase all scenes will be displayed in a shuffled order.  Second
phase, only 'Short text 1', 'Short text 2', and 'Short text 3' will be
displayed.

This way we can have a bunch of long, interesting, random encounters
and it will be obvious to the player when there is a short text that
it is 'less' interesting. Once only the short versions are displayed,
the player figures out the 'meat' of the story-telling is done and
that all that is left are the potatoes....

This can more elegantly be expressed with RND and <<restIsRandom>>
once April integrates that into PE.

There is another clause, <<scene-if>>, that April asked for that looks
like this (not in PE as of 0.7903):

<<scene-if boolean_expression>> or
<<scene-if boolean_expression chance>>

April asked for it to gate fetiches. If boolean_expression is true,
the scene is considered.  You can not have all <<scene-if>> because if
all boolean_expression are false, there must be at least one <<scene>>
to chose from.
