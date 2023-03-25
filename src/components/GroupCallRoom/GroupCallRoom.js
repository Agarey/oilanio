import React, { useState, useEffect, useMemo } from 'react';
import ConversationButtons from '../ConversationButtons/ConversationButtons';
import styles from './GroupCallRoom.module.css';
import GroupCallVideo from './GroupCallVideo';
import RemoteVideoView from './../RemoteVideoView/RemoteVideoView';
import LocalVideoView from './../LocalVideoView/LocalVideoView';
import { setLocalMicrophoneEnabled, setLocalCameraEnabled, setLocalStream, setCallState, callStates, setCallingDialogVisible, setCallerUsername, setCallRejected, setRemoteStream, setScreenSharingActive, resetCallDataState, setMessage } from '../../store/actions/callActions';
import { connect } from 'react-redux';

const GroupCallRoom = (props) => {
  const {
    localStream,
    callState,
    callerUsername,
    callingDialogVisible,
    callRejected,
    hideCallRejectedDialog,
    setDirectCallMessage,
    message, 
    role, 
    teacher, 
    student
  } = props;


  const { groupCallStreams } = props;

  const activeStreams = useMemo(() => {
    return groupCallStreams.filter(stream => stream && callState);
  }, [groupCallStreams, callState]); 

  useEffect(() => {
    console.log('activeStreams', activeStreams)
  }, [activeStreams]);

  return (
    <div className={styles.group_call_room_container}>
      <div className={styles.group_call_videos_container}>
        <LocalVideoView role={role} teacher={teacher} student={student} localStream={localStream} />
        {
          activeStreams.map(stream => {
            return <>
              {stream && callState && <RemoteVideoView role={role} teacher={teacher} student={student} username={props.username} key={stream.id} remoteStream={stream} />}
              
            </>
          })
        }
      </div>
      <ConversationButtons role={props.role} {...props} />
    </div>
  );
};

function mapStoreStateToProps ({ call }) {
  return {
    ...call
  };
}

function mapDispatchToProps (dispatch) {
  return {
    hideCallRejectedDialog: (callRejectedDetails) => dispatch(setCallRejected(callRejectedDetails)),
    setCameraEnabled: (enabled) => dispatch(setLocalCameraEnabled(enabled)),
    setMicrophoneEnabled: (enabled) => dispatch(setLocalMicrophoneEnabled(enabled)),
    setDirectCallMessage: (received, content) => dispatch(setMessage(received, content))
  };
}

export default connect(mapStoreStateToProps, mapDispatchToProps)(GroupCallRoom);