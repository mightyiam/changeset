var expect = require('chai').expect
  , diff = require('..');

describe('changeset', function () {
  beforeEach(function (done) {
    done();
  });

  it('should be able to diff two objects and return a changeset',
    function (done) {
      var a = {
        name: 'Eugene',
        number: 42,
        tags: ['tag1', 'tag2', 'tag3'],
        scores: {
          tetris: 1000,
          carmageddon: 3
        }
      };

      var b = {
        name: 'Susan',
        number: 43,
        tags: ['tag1', 'tag4'],
        scores: {
          carmageddon: 3,
          zelda: 3000
        },
        age: 37
      };

      var changes = diff(a, b);
      expect(changes).to.deep.equal([
        { type: 'put', key: ['name'], value: 'Susan' },
        { type: 'put', key: ['number'], value: 43 },
        { type: 'put', key: ['tags', '1'], value: 'tag4' },
        { type: 'del', key: ['tags', '2'] },
        { type: 'del', key: ['scores', 'tetris'] },
        { type: 'put', key: ['scores', 'zelda'], value: 3000 },
        { type: 'put', key: ['age'], value: 37 }
      ]);

      done();
    });

  it('should be able to apply a changeset to an object');
});
