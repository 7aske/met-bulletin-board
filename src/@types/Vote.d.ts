export interface VoteType {
	readonly id: string;
	readonly choice: string;
	readonly choiceIndex: number;
	readonly studentId: string;
	readonly dateVoted: Date;
}
