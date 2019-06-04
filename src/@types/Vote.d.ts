export interface VoteType {
	readonly id: string;
	readonly choiceIndex: number;
	readonly studentId: string;
	readonly dateVoted: Date;
}
