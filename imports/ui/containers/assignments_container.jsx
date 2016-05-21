import { Meteor } from 'meteor/meteor'
import { Assignments } from '../../api/assignments/assignments.js'
import { Campaigns } from '../../api/campaigns/campaigns.js'
import { createContainer } from 'meteor/react-meteor-data'
import { AssignmentsPage } from '../pages/assignments_page'


export default createContainer(({organizationId}) => {
  const handle = Meteor.subscribe('assignments')

  let assignments = []
  console.log(organizationId, assignments, assignments.map((a) => a.campaign()))

  if (handle.ready())
  {
    assignments = Assignments.find({
      userId: Meteor.userId()
    }).fetch().filter((assignment) => assignment.campaign().organizationId === organizationId)
  }
  return {
    organizationId,
    assignments,
    loading: !handle.ready()

  }
}, AssignmentsPage)
