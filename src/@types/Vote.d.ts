export interface VoteType {
	readonly id: string;
	readonly choice: string;
	readonly voteIndex: number;
	readonly studentIndex: string;
	readonly dateVoted: Date;
}
