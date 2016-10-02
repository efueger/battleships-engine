import Battlefield from '../src/battlefield.js';
import Item from '../src/item.js';
import Ship from '../src/ship.js';

describe( 'Battlefield:', () => {
	let battlefield, sandbox;

	beforeEach( () => {
		sandbox = sinon.sandbox.create();
		battlefield = new Battlefield( 5 );
	} );

	afterEach( () => {
		sandbox.restore();
	} );

	describe( 'constructor()', () => {
		it( 'should create an instance of Battlefield with some properties', () => {
			expect( battlefield ).to.have.property( 'size', 5 );
		} );
	} );

	describe( 'move()', () => {
		it( 'should put item on the battlefield', () => {
			const item = new Item( 2 );

			battlefield.move( item, [ 1, 1 ] );

			expect( item.coordinates ).to.deep.equal( [ [ 1, 1 ], [ 2, 1 ] ] );
		} );

		it( 'should move item on the battlefield', () => {
			const item = new Item( 2 );

			battlefield.move( item, [ 1, 1 ] );
			battlefield.move( item, [ 2, 2 ] );

			expect( item.coordinates ).to.deep.equal( [ [ 2, 2 ], [ 3, 2 ] ] );
		} );

		it( 'should move item when there is more than one item on he same field', () => {
			const item1 = new Item( 2 );
			const item2 = new Item( 2 );

			battlefield.move( item1, [ 1, 1 ] );
			battlefield.move( item2, [ 2, 1 ] );

			battlefield.move( item1, [ 2, 4 ] );

			expect( item1.coordinates ).to.deep.equal( [ [ 2, 4 ], [ 3, 4 ] ] );
		} );
	} );

	describe( 'validateShipCollision()', () => {
		it( 'should return `false` and mark ship as no collision when ship has no contact with other ships #1', () => {
			const ship = createShip( 1 );

			battlefield.move( ship, [ 1, 1 ] );

			expect( battlefield.validateShipCollision( ship ) ).to.false;
			expect( ship.isCollision ).to.false;
		} );

		it( 'should return `false` and mark ship as no collision when ship has no contact with other ships #2', () => {
			// Ship is surrounded by other ships, but there is one field position of space between them.
			//
			// [2][2][2][2][3]
			// [5]         [3]
			// [5]   [1]   [3]
			// [5]         [3]
			// [5][4][4][4][4]

			const ship1 = createShip( 1 );
			const ship2 = createShip( 4 );
			const ship3 = createShip( 4, true );
			const ship4 = createShip( 4 );
			const ship5 = createShip( 4, true );

			battlefield.move( ship1, [ 3, 3 ] );
			battlefield.move( ship2, [ 0, 0 ] );
			battlefield.move( ship3, [ 4, 0 ] );
			battlefield.move( ship4, [ 1, 4 ] );
			battlefield.move( ship5, [ 0, 1 ] );

			expect( battlefield.validateShipCollision( ship1 ) ).to.false;
			expect( ship1.isCollision ).to.false;
			expect( ship2.isCollision ).to.false;
			expect( ship3.isCollision ).to.false;
			expect( ship4.isCollision ).to.false;
			expect( ship5.isCollision ).to.false;
		} );

		it( 'should return `true` and mark ships as collision when there is more than one ship on the same field #1', () => {
			// [1,2]
			const ship1 = createShip( 1 );
			const ship2 = createShip( 1 );

			battlefield.move( ship1, [ 3, 3 ] );
			battlefield.move( ship2, [ 3, 3 ] );

			expect( battlefield.validateShipCollision( ship1 ) ).to.true;
			expect( ship1.isCollision ).to.true;
			expect( ship2.isCollision ).to.true;
		} );

		it( 'should return `true` and mark ships as collision when there is more than one ship on the same field #2', () => {
			// [ 1 ][1,2][ 2 ]
			const ship1 = createShip( 2 );
			const ship2 = createShip( 2 );

			battlefield.move( ship1, [ 0, 0 ] );
			battlefield.move( ship2, [ 1, 0 ] );

			expect( battlefield.validateShipCollision( ship1 ) ).to.true;
			expect( ship1.isCollision ).to.true;
			expect( ship2.isCollision ).to.true;
		} );

		it( 'should return `true` and mark ships as collision when there is more than one ship on the same field #2', () => {
			//      [ 1 ]
			// [ 2 ][1,2]
			const ship1 = createShip( 2, true );
			const ship2 = createShip( 2 );

			battlefield.move( ship1, [ 1, 0 ] );
			battlefield.move( ship2, [ 0, 1 ] );

			expect( battlefield.validateShipCollision( ship1 ) ).to.true;
			expect( ship1.isCollision ).to.true;
			expect( ship2.isCollision ).to.true;
		} );
	} );

	describe( 'getPositionAtTheTopOf()', () => {
		expect( Battlefield.getPositionAtTheTopOf( [ 5, 5 ] ) ).to.deep.equal( [ 5, 4 ] );
	} );

	describe( 'getPositionAtTheRightOf()', () => {
		expect( Battlefield.getPositionAtTheRightOf( [ 5, 5 ] ) ).to.deep.equal( [ 6, 5 ] );
	} );

	describe( 'getPositionAtTheBottomOf()', () => {
		expect( Battlefield.getPositionAtTheBottomOf( [ 5, 5 ] ) ).to.deep.equal( [ 5, 6 ] );
	} );

	describe( 'getPositionAtTheLeftOf()', () => {
		expect( Battlefield.getPositionAtTheLeftOf( [ 5, 5 ] ) ).to.deep.equal( [ 4, 5 ] );
	} );
} );

function createShip( length, isRotated ) {
	const ship = new Ship( length );

	if ( isRotated ) {
		ship.rotate();
	}

	return ship;
}