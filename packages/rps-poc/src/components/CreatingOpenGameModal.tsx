import _ from 'lodash';
import React from 'react';

import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import web3Utils from 'web3-utils';

interface Props {
  visible: boolean;
  createOpenGame: (roundBuyIn: string) => void;
  cancelOpenGame: () => void;
}

const MIN_BUYIN = 0.001;
const MAX_BUYIN = 1;

export default class CreatingOpenGameModal extends React.PureComponent<Props> {
  buyinInput: any;
  invalidBuyin: number | null;

  constructor(props) {
    super(props);
    this.buyinInput = React.createRef();
    this.invalidBuyin = null;
    this.createOpenGameHandler = this.createOpenGameHandler.bind(this);
  }

  componentDidUpdate() {
    if (this.buyinInput.current) {
      this.buyinInput.current.focus();
    }
  }

  createOpenGameHandler(e) {
    e.preventDefault();
    const buyin = Number(this.buyinInput.current.value);

    if (buyin < MIN_BUYIN || buyin > MAX_BUYIN) {
      this.invalidBuyin = buyin;
      this.forceUpdate();
      return;
    } else {
      this.invalidBuyin = null;
    }

    // TODO: disable button when input is empty
    if (!buyin || Number.isNaN(buyin)) {
      return;
    }
    this.props.createOpenGame(web3Utils.toWei(buyin.toString(), 'ether'));
    this.buyinInput.current.value = '';
  }

  render() {
    return (
    <Modal className="cog-container" toggle={this.props.cancelOpenGame} isOpen={this.props.visible} centered={true}>
      <ModalHeader className="rules-header">
        Create A Game
      </ModalHeader>

      <ModalBody>
        <form className="cog-form" onSubmit={e => this.createOpenGameHandler(e)}>
          <div className="form-group">
            <label htmlFor="buyin">Enter Game Buy In Amount</label>
            <div className="cog-input-group">
              <input
                className="cog-input form-control"
                name="buyin"
                id="buyin"
                ref={this.buyinInput}
                autoFocus={true}
              />
              <div>ETH</div>
            </div>
            <small className="form-text text-muted">
            {
              this.invalidBuyin
              ? `Invalid buy in: ${this.invalidBuyin}. Please enter an amount between ${MIN_BUYIN} and ${MAX_BUYIN}`
              : `Please enter an amount between ${MIN_BUYIN} and ${MAX_BUYIN}`
            }
            </small>
            <div className="mt-2">Round Buy In:</div>
            <small className="form-text text-muted">
              This will be 20% of the total buy in amount.
            </small>
          </div>
          <Button className="cog-button" type="submit" block={true}>
            Create Game
          </Button>
        </form>
      </ModalBody>
    </Modal>
    );
  }
}