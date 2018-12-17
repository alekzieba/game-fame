import { spy } from 'sinon';
import * as actions from '../../app/actions/ConnectFour';

describe('actions', () => {
  it('should getBoard should not get board for bad gameKey', () => {
    const fn = actions.getBoard('test', '', '');
    const dispatch = spy();

    fn(dispatch);
    expect(dispatch.called).toBe(false);
  });

  it('should clickColumn should succeed when empty', () => {
    const fn = actions.clickColumn(
      0,
      [
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', '']
      ],
      true,
      'sarthak',
      'gharvhel',
      false,
      'testgamekey'
    );
    expect(fn).toMatchSnapshot();
  });

  it('should clickColumn should succeed when almost full', () => {
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
    expect(fn).toBe(undefined);
  });

  it('should createBoard should create new board', () => {
    expect(actions.createBoard('', '', '')).toMatchSnapshot();
  });
});
