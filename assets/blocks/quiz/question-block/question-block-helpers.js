/**
 * WordPress dependencies
 */
import { Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Icon, info } from '@wordpress/icons';

/**
 * Display a notice about the question being shared across quizzes.
 */
export const SharedQuestionNotice = () => (
	<div className="sensei-lms-question-block__notice">
		<Icon icon={ info } />
		<Tooltip
			text={ __(
				'Any updates made to this question will also update it in any other quiz that includes it.',
				'sensei-lms'
			) }
		>
			<span>{ __( 'Shared Question', 'sensei-lms' ) }</span>
		</Tooltip>
	</div>
);
