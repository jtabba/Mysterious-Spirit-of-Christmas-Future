export interface IParticipantDetails {
	name: string;
	email: string;
	id: string;
}

export interface WithChildren<T = React.ReactNode> {
	children?: T;
}
