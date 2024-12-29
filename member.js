function skillsMember() {
    const member = {
        name: 'John Doe',
        skills: ['JavaScript', 'React', 'Node.js'],
        addSkill: function(skill) {
            this.skills.push(skill);
        },
        listSkills: function() {
            return this.skills.join(', ');
        }
    };

    return member;
}