import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { observer } from 'mobx-react-lite';
import { messages, globalVariables, specificTarget } from '../stores/store';
import { InputAreaStyles } from '../stores/styles';
import { GetTimestamp } from '../stores/utils';
import axios, { CancelTokenSource } from 'axios';

export default observer(() => {
    const cancelTokenSource = useRef<CancelTokenSource | null>(null);

    const handlePress = () => {
        // If recording is false, cancel all requests
        if (globalVariables.recording == false && cancelTokenSource.current) {
            cancelTokenSource.current.cancel('Operation canceled due to recording stopped.');
        }

        // Create a new CancelToken for future requests
        cancelTokenSource.current = axios.CancelToken.source();

        if (specificTarget.get().name !== "") {
            messages.newMessage({
                message: `Stopping task: Identify ${specificTarget.get().name}`,
                timestamp: GetTimestamp(),
                from: 1,
                id: 0,
                initiate: false,
                target: {}
            });
        }

        specificTarget.setTarget({
            name: "",
            nature: ""
        });

        globalVariables.setRecording(!globalVariables.recording);
    };

    return (
        <TouchableOpacity
            style={[InputAreaStyles.recordButton, {
                backgroundColor: globalVariables.recording ? "rgba(241, 26, 67, 0.85)" : "rgba(52, 52, 52, 0.75)"
            }]}
            onPress={handlePress}
        >
            <Feather
                name={globalVariables.recording ? "pause" : "play"}
                style={InputAreaStyles.recordButtonIcon}
                size={24}
            />
        </TouchableOpacity>
    );
});