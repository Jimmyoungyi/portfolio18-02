export class AnimateWaveArea {
	xarea: number[];
	yarea: number[];
	speed: number[];
}

export class WaveArray {
	x: number;
	y: number;
	post: number;
	nextget: number;
	basicX: number;
	basicY: number;
	horizonalPoint: number;
	horizonalSpeed: number;
	verticalPoint: number;
	verticalSpeed: number;
	horizonalTrack: boolean;
	verticalTrack: boolean;
}

export class WavePreset {
	waveArray: WaveArray[];
	fillStyle: string;
	strokeWidth: number;
	strokeStyle: string;
	waveStartPoint: number;
	waveEndPoint: number;
	waveBasicLine: number;
	waveClosePath: number[][];
	waveHeight: number[];
	wavePost: number[];
	waveNextGet: number[];
	waveDistance: number[];
	baseLineDistination: number;
	animateFloatSpeed: number;
	animateWaveArea: AnimateWaveArea;
}
