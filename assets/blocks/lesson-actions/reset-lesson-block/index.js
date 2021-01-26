import { __ } from '@wordpress/i18n';

import { BlockStyles, createButtonBlockType } from '../../button';

/**
 * Reset lesson button block.
 */
export default createButtonBlockType( {
	tagName: 'button',
	settings: {
		name: 'sensei-lms/button-reset-lesson',
		title: __( 'Reset Lesson', 'sensei-lms' ),
		parent: [ 'sensei-lms/lesson-actions' ],
		description: __(
==== BASE ====
			'Enable an enrolled user to reset their progress in the lesson. The button is displayed when the learner has completed the lesson and is able to reset the progress.',
==== BASE ====
			'sensei-lms'
		),
		keywords: [
			__( 'Reset', 'sensei-lms' ),
			__( 'Restart', 'sensei-lms' ),
			__( 'Revert', 'sensei-lms' ),
			__( 'Progress', 'sensei-lms' ),
			__( 'Lesson', 'sensei-lms' ),
			__( 'Button', 'sensei-lms' ),
		],
		attributes: {
			text: {
				default: __( 'Reset Lesson', 'sensei-lms' ),
			},
			buttonClassName: {
				default: [ 'sensei-stop-double-submission' ],
			},
		},
		styles: [
			BlockStyles.Fill,
			{ ...BlockStyles.Outline, isDefault: true },
			BlockStyles.Link,
		],
	},
} );
