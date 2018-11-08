import { spy } from 'sinon';
import * as actions from '../../app/actions/ConnectFour';

describe('actions', () => {
  it('should getBoard should not get board for bad gameKey', () => {
    const fn = actions.getBoard('test', '', '');
    const dispatch = spy();

    fn(dispatch);
    expect(dispatch.called).toBe(false);
  });

  // TODO create test where getBoard succeeds

  it('should clickColumn should succeed', () => {
    const fn = actions.clickColumn(
      0,
      [
        ['', 'x', 'o', 'x', 'o', 'x'],
        ['x', 'o', 'x', 'o', 'x', 'o'],
        ['o', 'x', 'o', 'x', 'o', 'x'],
        ['x', 'o', 'x', 'o', 'x', 'o'],
        ['o', 'x', 'o', 'x', 'o', 'x'],
        ['x', 'o', 'x', 'o', 'x', 'o'],
        ['o', 'x', 'o', 'x', 'o', 'x']
      ],
      true,
      'sarthak',
      'gharvhel',
      false,
      'testgamekey'
    );
    expect(fn).toMatchSnapshot();
  });

  it('should clickColumn should fail for a full column', () => {
    const fn = actions.clickColumn(
      0,
      [
        ['o', 'x', 'o', 'x', 'o', 'x'],
        ['x', 'o', 'x', 'o', 'x', 'o'],
        ['o', 'x', 'o', 'x', 'o', 'x'],
        ['x', 'o', 'x', 'o', 'x', 'o'],
        ['o', 'x', 'o', 'x', 'o', 'x'],
        ['x', 'o', 'x', 'o', 'x', 'o'],
        ['o', 'x', 'o', 'x', 'o', 'x']
      ],
      true,
      'sarthak',
      'gharvhel',
      false,
      'testgamekey'
    );
    expect(fn).toBe(null);
  });

  it('should createBoard should create new board', () => {
    expect(actions.createBoard('', '', '')).toMatchSnapshot();
  });
});
