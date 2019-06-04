import { Choices } from "./Poll";

export type DataStoreTypes = boolean | number | string | string[] | Choices | TemplateDataType | null ;
export type DataStoreKeys = "isPopUp" | "currentTemplate" | "key";

export interface DataStore {
	readonly state: State;
	readonly _state: _State;

	setState(state: DataStoreKeys, value: DataStoreTypes): DataStoreTypes;

	getState(state: DataStoreKeys): DataStoreTypes;

	registerState(state: DataStoreKeys, value: DataStoreTypes): void;

	subscribe(state: DataStoreKeys, actions: Function[]): void;

	getStateObject?(): _State;
}

export interface _State {
	[key: string]: _StateProp;
}

export interface State {
	[key: string]: DataStoreTypes;
}

export interface _StateProp {
	value: DataStoreTypes;
	actions: Function[];
}
