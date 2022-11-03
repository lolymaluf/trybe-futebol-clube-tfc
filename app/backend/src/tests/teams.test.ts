import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamsModel';
import teams from '../mocks/teams.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa Rota /teams', () => {
  describe('quando a requisição for feita corretamente', () => {
    const response = teams;
    beforeEach(() => {
      sinon
      .stub(Teams, 'findAll')
      .resolves();
     });

     afterEach(() => sinon.restore())

  it('Retorna status ok 200', async () => {
    const httpResponse = await chai
            .request(app)
            .get('/teams')
        expect(httpResponse.status).to.be.equal(200);
  });
});
});
