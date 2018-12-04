import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { resolve } from 'rsvp';

const ITEMS = [{city: 'San Francisco'}, {city: 'Portland'}, {city: 'Seattle'}];
const FILTERED_ITEMS = [{city: 'San Francisco'}];

module('Integration | Component | list-filter', function(hooks) {
  setupRenderingTest(hooks);

  test('should initially load all listings', async function(assert) {
    // we want our actions to return promises,
    // since they are potentially fetching data asynchronously
    this.set('filterByCity', () => resolve({ results: ITEMS }));

    // with an integration test,
    // you can set up and use your component in the same way your application
    // will use it.
    await render(hbs`
        {{#list-filter filter=(action filterByCity) as |results|}}
          <ul>
          {{#each results as |item|}}
            <li class="city">
              {{item.city}}
            </li>
          {{/each}}
          </ul>
        {{/list-filter}}
      `);
  });
});
