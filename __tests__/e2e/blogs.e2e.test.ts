import request from 'supertest';

import { app } from '../../src/settings';
import { ResponseStatusCodesEnum } from '../../src/types/common';

describe('/blogs', () => {
  const authHeaderString = `Basic ${btoa('admin:qwerty')}`;

  it ('should return empty blog array', async () => {
    const blogResult =  await request(app)
      .get('/blogs')
      .set('Authorization', authHeaderString);

      expect(blogResult.body).toEqual([]);
  });

  it(`should'nt return blog with incorrect id`, async () => {
    const blogResult = await request(app)
      .get('/blogs/444444')
      .set('Authorization', authHeaderString)

    expect(blogResult.statusCode).toBe(ResponseStatusCodesEnum.NotFound);
  });
});
