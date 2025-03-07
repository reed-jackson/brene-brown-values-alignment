"use client";

import { useState } from "react";
import { styled } from "@stitches/react";
import { ThumbsUp, ThumbsDown, Minus, List, RotateCcw } from "lucide-react";
import { Button } from "@radix-ui/themes";

type Rating = "up" | "neutral" | "down";

interface RatedItem {
	text: string;
	rating: Rating | null;
}

export default function Home() {
	const initialItems = [
		"Accountability",
		"Achievement",
		"Adaptability",
		"Adventure",
		"Altruism",
		"Ambition",
		"Authenticity",
		"Balance",
		"Beauty",
		"Being the best",
		"Belonging",
		"Career",
		"Caring",
		"Collaboration",
		"Commitment",
		"Community",
		"Compassion",
		"Competence",
		"Confidence",
		"Connection",
		"Contentment",
		"Contribution",
		"Cooperation",
		"Courage",
		"Creativity",
		"Curiosity",
		"Dignity",
		"Diversity",
		"Environment",
		"Efficiency",
		"Equality",
		"Ethics",
		"Excellence",
		"Fairness",
		"Faith",
		"Family",
		"Financial stability",
		"Forgiveness",
		"Freedom",
		"Friendship",
		"Fun",
		"Future generations",
		"Generosity",
		"Giving back",
		"Grace",
		"Gratitude",
		"Growth",
		"Harmony",
		"Health",
		"Home",
		"Honesty",
		"Hope",
		"Humility",
		"Humor",
		"Inclusion",
		"Independence",
		"Initiative",
		"Integrity",
		"Intuition",
		"Job security",
		"Joy",
		"Justice",
		"Kindness",
		"Knowledge",
		"Leadership",
		"Learning",
		"Legacy",
		"Leisure",
		"Love",
		"Loyalty",
		"Making a difference",
		"Nature",
		"Openness",
		"Optimism",
		"Order",
		"Parenting",
		"Patience",
		"Patriotism",
		"Peace",
		"Perseverance",
		"Personal fulfillment",
		"Power",
		"Pride",
		"Recognition",
		"Reliability",
		"Resourcefulness",
		"Respect",
		"Responsibility",
		"Risk-taking",
		"Safety",
		"Security",
		"Self-discipline",
		"Self-expression",
		"Self-respect",
		"Serenity",
		"Service",
		"Simplicity",
		"Spirituality",
		"Sportsmanship",
		"Stewardship",
		"Success",
		"Teamwork",
		"Thrift",
		"Time",
		"Tradition",
		"Travel",
		"Trust",
		"Truth",
		"Understanding",
		"Uniqueness",
		"Usefulness",
		"Vision",
		"Vulnerability",
		"Wealth",
		"Well-being",
		"Wholeheartedness",
		"Wisdom",
	];

	const [items, setItems] = useState<RatedItem[]>(initialItems.map((text) => ({ text, rating: null })));
	const [isComplete, setIsComplete] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [showResults, setShowResults] = useState(false);

	const handleReset = () => {
		if (window.confirm("Are you sure you want to reset all your ratings?")) {
			setItems(initialItems.map((text) => ({ text, rating: null })));
			setCurrentIndex(0);
			setIsComplete(false);
			setShowResults(false);
		}
	};

	const handleRating = (index: number, rating: Rating) => {
		const newItems = [...items];
		newItems[index] = { ...newItems[index], rating };
		setItems(newItems);

		// Move to next item if not at the end
		if (index < items.length - 1) {
			setCurrentIndex(index + 1);
		}

		// Check if all items have been rated
		if (newItems.every((item) => item.rating !== null)) {
			setIsComplete(true);
		}
	};

	const StyledButton = styled(Button, {
		padding: "8px 16px",
		margin: "0 4px",
		borderRadius: "4px",
		border: "1px solid #ccc",
		background: "var(--blue-9)",
		cursor: "pointer",
		display: "inline-flex",
		alignItems: "center",
		gap: "4px",
		"&:hover": {
			background: "var(--blue-10)",
		},
		"&[data-active=true]": {
			background: "var(--blue-10)",
			borderColor: "#666",
		},
	});

	const Container = styled("div", {
		maxWidth: "600px",
		margin: "0 auto",
		padding: "20px",
	});

	const ItemContainer = styled("div", {
		marginBottom: "20px",
		padding: "16px",
		border: "1px solid #eee",
		borderRadius: "8px",
		textAlign: "center",
	});

	const CategoryContainer = styled("div", {
		marginTop: "20px",
		padding: "16px",
		border: "1px solid #eee",
		borderRadius: "8px",
	});

	const Progress = styled("div", {
		marginBottom: "20px",
		textAlign: "center",
		color: "#666",
	});

	const ValueText = styled("p", {
		fontSize: "24px",
		fontWeight: "bold",
		marginBottom: "20px",
	});

	const ButtonContainer = styled("div", {
		display: "flex",
		gap: "10px",
		marginTop: "20px",
	});

	const ActionButton = styled(StyledButton, {
		flex: 1,
		justifyContent: "center",
	});

	const categorizedItems = {
		up: items.filter((item) => item.rating === "up"),
		neutral: items.filter((item) => item.rating === "neutral"),
		down: items.filter((item) => item.rating === "down"),
	};

	const ResultsView = () => (
		<div>
			{Object.entries(categorizedItems).map(([category, items]) => (
				<CategoryContainer key={category}>
					<h2>
						{category === "up" ? "Strong Values" : category === "neutral" ? "Neutral Values" : "Less Important Values"}
					</h2>
					<ul>
						{items.map((item, index) => (
							<li key={index}>{item.text}</li>
						))}
					</ul>
				</CategoryContainer>
			))}
		</div>
	);

	if (isComplete) {
		return (
			<Container>
				<h1>Your Values Assessment Results</h1>
				<ResultsView />
				<ButtonContainer>
					<ActionButton onClick={handleReset}>
						<RotateCcw size={16} />
						Start Over
					</ActionButton>
				</ButtonContainer>
			</Container>
		);
	}

	return (
		<Container>
			<h1>Rate Your Values</h1>
			<Progress>
				Progress: {currentIndex + 1} / {items.length}
			</Progress>
			<ItemContainer>
				<ValueText>{items[currentIndex].text}</ValueText>
				<div>
					<StyledButton data-active={items[currentIndex].rating === "up"} onClick={() => handleRating(currentIndex, "up")}>
						<ThumbsUp size={16} />
						Important to me
					</StyledButton>
					<StyledButton
						data-active={items[currentIndex].rating === "neutral"}
						onClick={() => handleRating(currentIndex, "neutral")}
					>
						<Minus size={16} />
						Neutral
					</StyledButton>
					<StyledButton
						data-active={items[currentIndex].rating === "down"}
						onClick={() => handleRating(currentIndex, "down")}
					>
						<ThumbsDown size={16} />
						Less important
					</StyledButton>
				</div>
			</ItemContainer>
			<ButtonContainer>
				<ActionButton onClick={() => setShowResults(!showResults)}>
					<List size={16} />
					{showResults ? "Hide Current Results" : "Show Current Results"}
				</ActionButton>
				<ActionButton onClick={handleReset}>
					<RotateCcw size={16} />
					Start Over
				</ActionButton>
			</ButtonContainer>
			{showResults && <ResultsView />}
		</Container>
	);
}
