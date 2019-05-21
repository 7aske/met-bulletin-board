"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Store {
    constructor(initialState) {
        this._state = {};
        this.state = {};
        Object.keys(initialState).forEach(key => {
            this._state[key] = { value: initialState[key], actions: [] };
        });
        this.state = initialState;
    }
    setState(name, state) {
        if (Object.keys(this._state).indexOf(name) == -1) {
            throw new Error("State must be registered first");
        }
        else {
            this.set(name, state);
            if (this._state[name].actions) {
                this._state[name].actions.forEach(action => {
                    action();
                });
            }
        }
        return this.state[name];
    }
    registerState(name, initialState) {
        if (Object.keys(this.state).indexOf(name) != -1) {
            throw new Error("State already exists");
        }
        else {
            this.set(name, initialState);
        }
    }
    getState(name) {
        if (Object.keys(this.state).indexOf(name) == -1) {
            throw new Error("State is not registered - '" + name + "'");
        }
        else {
            return this.state[name];
        }
    }
    subscribe(name, actions) {
        if (Object.keys(this._state).indexOf(name) == -1) {
            throw new Error("State is not registered");
        }
        else {
            this._state[name].actions = actions;
        }
    }
    getStateObject() {
        return this._state;
    }
    set(name, state) {
        if (Object.keys(this.state).indexOf(name) == -1) {
            this.state[name] = state;
            this._state[name] = { value: state, actions: [] };
        }
        else {
            this._state[name].value = state;
            this.state[name] = state;
        }
    }
}
exports.Store = Store;
