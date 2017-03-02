import { expect } from 'chai';

import { readPronouns } from './index';

describe('pronouns.json', () => {
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
