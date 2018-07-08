import { RpsGame, RpsState } from './game-rules';
import { Channel } from 'fmg-core'

test('fromHex', () => {
    let channel = new Channel('0x1234567', 3141592, ['0x123', '0x456']);
    let resolution = [1,2];
    let turnNum = 511;
    let stake = 63;
    // TODO: Test InitializationState, FundConfirmationState, and ConclusionState

    let s = RpsGame.restingState({channel, resolution, turnNum, stake});
    let h = s.toHex();
    let h2 = (RpsState.fromHex(h)).toHex()
    expect(h).toBe(h2)

    let aPlay = RpsGame.Plays.ROCK;
    let salt = 'xyz';
    s = RpsGame.proposeState({channel, resolution, turnNum, stake, aPlay, salt});
    h = s.toHex();
    h2 = (RpsState.fromHex(h)).toHex()
    expect(h).toBe(h2)

    let bPlay = RpsGame.Plays.SCISSORS;
    let precommit = 'abbb5caa7dda850e60932de0934eb1f9d0f59695050f761dc64e443e5030a569';
    s = RpsGame.acceptState({channel, resolution, turnNum, stake, precommit, bPlay});
    h = s.toHex();
    h2 = (RpsState.fromHex(h)).toHex()
    expect(h).toBe(h2)

    s = RpsGame.revealState({channel, resolution, turnNum, stake, aPlay, bPlay, salt});
    h = s.toHex();
    h2 = (RpsState.fromHex(h)).toHex()
    expect(h).toBe(h2)
});