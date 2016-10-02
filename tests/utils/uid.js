import uid from '../../src/utils/uid.js';

describe( 'utils', () => {
	describe( 'uid', () => {
		it( 'should return different ids', () => {
			let id1 = uid();
			let id2 = uid();
			let id3 = uid();

			expect( id1 ).to.be.a( 'number' );
			expect( id2 ).to.be.a( 'number' ).to.not.equal( id1 ).to.not.equal( id3 );
			expect( id3 ).to.be.a( 'number' ).to.not.equal( id1 ).to.not.equal( id2 );
		} );
	} );
} );