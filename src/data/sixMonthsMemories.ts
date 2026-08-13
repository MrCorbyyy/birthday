/**
 * All the content for the "Six Months" page lives here.
 *
 * Everything below is editable — nothing in the components themselves
 * should need to change if you just want to fix a caption, swap a photo,
 * or reorder a chapter. Captions were written from what's actually visible
 * in the photos/videos in /public/6-mnth-anniv, but you know the real
 * story better than a caption ever could — change anything that's off.
 */

// The moment the countdown on the original site hit zero and she said yes.
export const START_DATE = '2026-02-13T00:00:00';

// One year out from START_DATE — powers the small forward-looking countdown
// near the end of the page. Change this if you'd rather count down to
// something else (a trip, a birthday, etc).
export const NEXT_MILESTONE_DATE = '2027-02-13T00:00:00';
export const NEXT_MILESTONE_LABEL = 'Year One';

export type MemoryMedia = {
	type: 'image' | 'video';
	src: string;
	alt: string;
};

export type Chapter = {
	id: string;
	emoji: string;
	title: string;
	dateLabel: string;
	caption: string;
	media: MemoryMedia[];
};

export const chapters: Chapter[] = [
	{
		id: 'screen-to-screen',
		emoji: '🎬',
		title: 'Screen to Screen',
		dateLabel: 'Our first "movie night"',
		caption:
			"Before we could share a couch, we shared a laptop screen. Movie playing in one window, your face in the corner of the call, and neither of us actually watching because we wouldn't stop talking through it. Still counts as a movie night. Maybe my favorite one.",
		media: [
			{
				type: 'video',
				src: '/6-mnth-anniv/web/first_movie_night.mp4',
				alt: 'Watching a movie together on a video call',
			},
		],
	},
	{
		id: 'cinema-night',
		emoji: '🍿',
		title: 'Big Screen, Finally',
		dateLabel: 'Real seats this time',
		caption:
			"No more laptop cameras — actual reclining seats and a screen bigger than both of us. I remember holding your hand through the lobby more than I remember the movie. Someone even caught a candid of us before we noticed the camera, which might be my favorite photo of us purely because we weren't posing for it.",
		media: [
			{
				type: 'image',
				src: '/6-mnth-anniv/anniv_cover.JPG',
				alt: 'Mirror selfie, just us',
			},
			{
				type: 'image',
				src: '/6-mnth-anniv/off_to_cinema.JPG',
				alt: 'Holding hands walking into the cinema',
			},
			{
				type: 'image',
				src: '/6-mnth-anniv/over_spying.JPG',
				alt: 'Candid photo of us walking through the mall',
			},
		],
	},
	{
		id: 'game-night',
		emoji: '🕹️',
		title: 'The Night We Turned Everything Into a Competition',
		dateLabel: 'Laser tag. Bowling. An arcade hoop game. Chaos.',
		caption:
			"One night, three separate competitions, zero chill from either of us. Laser tag squad 004 and 002 (you can guess who picked which vest). There's video evidence of me beating you at that arcade basketball game, so that's staying up here forever. Bowling got weirdly serious, weirdly fast. And somehow the night ended with both of us pressed against a jewelry counter pointing at watches we had no business pricing out.",
		media: [
			{
				type: 'image',
				src: '/6-mnth-anniv/web/IMG_5779.jpg',
				alt: 'Laser tag gear, squad 004 and 002',
			},
			{
				type: 'video',
				src: '/6-mnth-anniv/web/first_arcade_game.mp4',
				alt: 'Playing our first arcade game',
			},
			{
				type: 'video',
				src: '/6-mnth-anniv/web/after_beating_my_babe_in_BBall.mp4',
				alt: 'The arcade basketball game I definitely won',
			},
			{
				type: 'video',
				src: '/6-mnth-anniv/web/bowler_loser.mp4',
				alt: 'Bowling night at Bowling For Real',
			},
			{
				type: 'video',
				src: '/6-mnth-anniv/web/strike_baby.mp4',
				alt: 'A strike at bowling night',
			},
			{
				type: 'image',
				src: '/6-mnth-anniv/after_arcade.JPG',
				alt: 'Window shopping for watches after the arcade',
			},
			{
				type: 'video',
				src: '/6-mnth-anniv/after_arcade.mp4',
				alt: 'Right after the arcade',
			},
		],
	},
	{
		id: 'wheels-up',
		emoji: '✈️',
		title: 'The Trip That Made It Real',
		dateLabel: 'A flight for me, a 2am station for you',
		caption:
			"Boarding passes in hand — I got on a flight to Nigeria, because calls and countdowns weren't going to cut it anymore. You did your own version of showing up for it too: out the door and at the station by 2am to make your own way down.",
		media: [
			{
				type: 'video',
				src: '/6-mnth-anniv/web/trip_to_nigeria.mp4',
				alt: 'Boarding passes for the flight to Nigeria',
			},
			{
				type: 'image',
				src: '/6-mnth-anniv/back_to_nigeria.JPG',
				alt: 'Late night selfie after landing',
			},
			{
				type: 'image',
				src: '/6-mnth-anniv/web/nigeria_selfie.jpg',
				alt: '2am at the station, on your way to Nigeria',
			},
		],
	},
	{
		id: 'pool-day',
		emoji: '🏊',
		title: 'Pool Day',
		dateLabel: 'May 27',
		caption:
			"A whole day with nowhere else to be. Car selfie on the way there, sunscreen everywhere, and — obviously — a mirror pic after, because we both know that's the only real proof a pool day happened.",
		media: [
			{
				type: 'video',
				src: '/6-mnth-anniv/way_to_pool.mp4',
				alt: 'Car selfie on the way to the pool, May 27',
			},
			{
				type: 'image',
				src: '/6-mnth-anniv/web/pool_time.jpg',
				alt: 'Mirror selfie after pool day',
			},
		],
	},
	{
		id: 'slow-mornings',
		emoji: '🥐',
		title: 'Slow Mornings',
		dateLabel: 'Over an hour for the food to show up',
		caption:
			"Bamboo chairs, good light, and a kitchen that took over an hour to actually serve us. We used every minute of it well — I took a picture of you, you took one of me, and by the time the food finally landed we'd basically forgotten we ordered it. Worth the wait anyway.",
		media: [
			{
				type: 'image',
				src: '/6-mnth-anniv/web/breakfast_her.jpg',
				alt: 'Breakfast morning, her',
			},
			{
				type: 'image',
				src: '/6-mnth-anniv/web/breakfast_his.jpg',
				alt: 'Breakfast morning, him',
			},
			{
				type: 'image',
				src: '/6-mnth-anniv/web/her_breakfast_food.jpg',
				alt: 'Her breakfast, finally served',
			},
			{
				type: 'image',
				src: '/6-mnth-anniv/web/his_breakfast_food.jpg',
				alt: 'His breakfast, finally served',
			},
		],
	},
	{
		id: 'just-us',
		emoji: '🤍',
		title: 'Just Us',
		dateLabel: 'No occasion at all',
		caption:
			'No event, no reason, no excuse needed. Just us, a mirror, and way too many selfies in a row. These are still my favorite kind of photo of you — the ones taken for absolutely no reason other than wanting to look at your face.',
		media: [
			{
				type: 'image',
				src: '/6-mnth-anniv/babe_selfie_only.JPG',
				alt: 'A solo photo of Kemi',
			},
			{
				type: 'video',
				src: '/6-mnth-anniv/web/selfie_time.mp4',
				alt: 'Selfie video, being silly',
			},
			{
				type: 'video',
				src: '/6-mnth-anniv/web/selfie_time_2.mp4',
				alt: 'Another selfie video',
			},
		],
	},
];

export type Achievement = {
	id: string;
	emoji: string;
	label: string;
	chapterId: string;
};

// Quick-glance "trophy shelf" — tapping one scrolls down to the full chapter.
export const achievements: Achievement[] = [
	{
		id: 'a1',
		emoji: '🎬',
		label: 'Long-Distance Movie Night',
		chapterId: 'screen-to-screen',
	},
	{
		id: 'a2',
		emoji: '🍿',
		label: 'Cinema Certified',
		chapterId: 'cinema-night',
	},
	{ id: 'a3', emoji: '🔫', label: 'Laser Tag Squad', chapterId: 'game-night' },
	{ id: 'a4', emoji: '🎳', label: 'Bowling Rivalry', chapterId: 'game-night' },
	{ id: 'a5', emoji: '✈️', label: 'Passport Stamped', chapterId: 'wheels-up' },
	{ id: 'a6', emoji: '🏊', label: 'Poolside Certified', chapterId: 'pool-day' },
	{
		id: 'a7',
		emoji: '🥐',
		label: 'Breakfast Regulars',
		chapterId: 'slow-mornings',
	},
];

// The clip used in the "one more thing" video reveal near the end of the page.
export const surpriseVideo = {
	src: '/6-mnth-anniv/web/selfie_time_2.mp4',
	poster: '/6-mnth-anniv/anniv_cover.JPG',
};
