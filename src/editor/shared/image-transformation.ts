import { Transformations } from '../plugins/transformations';
import { Effect } from '../plugins/effects/effect';

export class ImageTransformation {
    private readonly _effects: Effect[];

    constructor(...effects: Effect[]) {
        this._effects = effects;
    }

    public get effects(): Effect[] {
        return this._effects;
    }
}
