import path from 'path';
import { expect } from 'chai';

import inclsv, { readPronouns, getFlatDirectoryTree } from './index';

describe('Validation Suite', () => {

  describe('readPronouns', () => {
    it('should exist', () => {
      expect(readPronouns()).to.be.an('object');
    });
    it('should have correct shape', () => {
      expect(readPronouns()).to.deep.equal({
        genderBinary: {
          his: "possessivePronouns",
          hers: "possessivePronouns",
          he: "objectPronouns",
          she: "objectPronouns",
          him: "subjectPronouns",
          her: "subjectPronouns"
        },
        genderFluid: {
          possessivePronouns: "their",
          objectPronouns: "them",
          subjectPronouns: "they"
        }
      });
    });
  });

  describe('getFlatDirectoryTree', () => {
    it('should return a Promise', () => {
      expect(getFlatDirectoryTree(process.cwd())).to.be.an.instanceof(Promise);
    });
    it('should accept a single argument', () => {
      expect(getFlatDirectoryTree.length).to.equal(1);
    });
    it('should resolve to a flat array of files', (done) => {
      getFlatDirectoryTree(path.resolve(process.cwd(), './src')).then((files) => {
        // split because absolute paths differ across environments
        expect(files).to.be.an('array');
        files = files.map((file) => file.split('inclsv')[1]);
        expect(files).to.deep.equal([
          '/src/bin/index.js',
          '/src/index.js',
          '/src/index.test.js',
          '/src/pronouns.json'
        ]);
        done();
      }).catch((e) => {
        done(e);
      });
    });
  });

  describe('inclsv', () => {
    it('should return a Promise', () => {
      expect(inclsv(process.cwd())).to.be.an.instanceof(Promise);
    });
  });
});
