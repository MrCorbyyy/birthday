import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
	id: number;
	x: number;
	
	delay: number;
	duration: number;
	size: number;
}

export const AmbientParticles = () => {
	const [particles, setParticles] = useState<Particle[]>([]);

	useEffect(() => {
		const particleCount = 15;
		const newParticles: Particle[] = [];

		for (let i = 0; i < particleCount; i++) {
			newParticles.push({
				id: i,
				x: Math.random() * 100,
				delay: Math.random() * 10,
				duration: 15 + Math.random() * 10,
				size: 0.5 + Math.random() * 1,
			});
		}

		setParticles(newParticles);
	}, []);

	return (
		<div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
			{particles.map((particle) => (
				<motion.div
					key={particle.id}
					className="absolute text-rose-300/30"
					style={{
						left: `${particle.x}%`,
						fontSize: `${particle.size}rem`,
					}}
					initial={{ y: '110vh', rotate: 0, opacity: 0 }}
					animate={{
						y: '-10vh',
						rotate: 360,
						opacity: [0, 0.6, 0.6, 0],
						x: [0, 30, -30, 0],
					}}
					transition={{
						duration: particle.duration,
						delay: particle.delay,
						repeat: Infinity,
						ease: 'linear',
					}}>
					🌸
				</motion.div>
			))}
		</div>
	);
};
