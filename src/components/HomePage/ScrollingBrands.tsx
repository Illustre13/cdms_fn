import React from "react";
import "../../styles/HorizontalScroll.css";

const brands = [
	"brands-001.png",
	"brands-002.png",
	"brands-003.png",
	"brands-004.png",
	"brands-005.png",
	"brands-006.png",
	"brands-007.png",
	"brands-008.png",
	"brands-009.png",
	"brands-010.jpg",
	"brands-011.jpg",
	"brands-012.jpg",
	"brands-013.jpg",
	"brands-014.jpg",
];

const HorizontalScrollCards = () => {
	return (
		<section>
			<div className="block">
				<div className="marquees">
					<div>
						{brands.map((brand, index) => (
							<span key={index} className="roundeddivs">
								<img
									src={`/assets/images/brands/${brand}`}
									alt={`Logo of ${brand}`}
								/>
							</span>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default HorizontalScrollCards;
