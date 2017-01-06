import random from 'lib/utils/random.js';

export default {
	random() {
		for ( const ship of this.shipsCollection ) {
			ship.position = [ null, null ];
		}

		this._fields.clear();

		for ( const ship of this.shipsCollection.getReversed() ) {
			let done = false;

			while( !done ) {
				const isRotated = !!random( 0, 1 );
				const x = random( 0, this.size - 1 );
				const y = random( 0, this.size - 1 );

				this.moveShip( ship, [ x, y ], isRotated );
				done = !this._checkShipCollision( ship );
			}
		}
	}
};
