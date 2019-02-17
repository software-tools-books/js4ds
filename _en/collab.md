---
title: "Collaborating"
---

A project can survive badly-organized code;
none will survive for long if people are confused,
pulling in different directions,
or hostile.
This appendix therefore talks about what projects can do to make newcomers feel welcome
and to make things run smoothly after that.

It may seem strange to include this material in a tutorial on JavaScript,
but as Freeman pointed out in [Free1972](#BIB),
every group has a power structure;
the only question is whether it is formal and accountable
or informal and unaccountable.
Thirty-five years after the free software movement took on its modern, self-aware form,
its successes and failures have shown that if a project doesn't clearly state
who has the right to do what,
it will wind up being run by whoever argues loudest and longest.
For a much deeper discussion of these issues,
see [Foge2005](#BIB).

## Licensing Software {#s:collab-software}

If the law or a publication agreement prevents people from reading your work or using your software,
you're probably hurting your own career.
You may need to do this in order to respect personal or commercial confidentiality,
but the first and most important rule of inclusivity
is to be open by default.

That is easier said than done,
not least because the law hasn't kept up with everyday practice.
[Mori2012](#BIB) and [this blog post][vanderplas-licensing] are good starting points from a scientist's point of view,
while [Lind2008](#BIB) is a deeper dive for those who want details.
In brief,
creative works are automatically eligible for intellectual property (and thus copyright) protection.
This means that every creative work has some sort of license:
the only question is whether authors and users know what it is.

Every project should therefore include an explicit license.
This license should be chosen early:
if you don't set it up right at the start,
then each collaborator will hold copyright on their work
and will need to be asked for approval when a license *is* chosen.
By convention,
the license is usually put in a file called `LICENSE` or `LICENSE.txt` in the project's root directory.
This file should clearly state the license(s) under which the content is being made available;
the plural is used because code, data, and text may be covered by different licenses.

> *Don't write your own license*,
> even if you are a lawyer:
> legalese is a highly technical language,
> and words don't mean what you think they do.

To make license selection as easy as possible,
GitHub allows you to select one of the most common licenses when creating a repository.
The Open Source Initiative maintains [a list of licenses][osi-license-list],
and [choosealicense.com][choose-license] will help you find a license that suits your needs.
Some of the things you will need to think about are:

1.  Do you want to license the code at all?
2.  Is the content you are licensing source code?
3.  Do you require people distributing derivative works to also distribute their code?
4.  Do you want to address patent rights?
5.  Is your license compatible with the licenses of the software you depend on?
    For example, as we will discuss below,
    you can use MIT-licensed code in a GPL-licensed project but not vice versa.

The two most popular licenses for software are
the [MIT license](#g:mit-license) and the [GNU Public License](#g:gpl) (GPL).
The MIT license (and its close sibling the BSD license)
say that people can do whatever they want to with the software as long as they cite the original source,
and that the authors accept no responsibility if things go wrong.
The GPL gives people similar rights,
but requires them to share their own work on the same terms:

> You may copy, distribute and modify the software as long as you track changes/dates in source files.
> Any modifications to or software including (via compiler) GPL-licensed code must also be made available under the GPL
> along with build & install instructions.
>
> --- [tl;dr][tldr-gpl]

We recommend the MIT license:
it places the fewest restrictions on future action,
it can be made stricter later on,
and the last thirty years shows that it's good enough to keep work open.

## Licensing Data and Documentation {#s:collab-datadocs}

The MIT license and the GPL apply to software.
When it comes to data and reports,
the most widely used family of licenses are those produced by [Creative Commons][creative-commons],
which have been written and checked by lawyers and are well understood by the community.

The most liberal license is referred to as [CC-0](#g:cc-0),
where the "0" stands for "zero restrictions".
CC-0 puts work in the public domain,
i.e.,
allows anyone who wants to use it to do so however they want with no restrictions.
This is usually the best choice for data,
since it simplifies aggregate analysis.
For example,
if you choose a license for data that requires people to cite their source,
then anyone who uses that data in an analysis must cite you;
so must anyone who cites *their* results,
and so on,
which quickly becomes unwieldy.

The next most common license is the Creative Commons - Attribution license,
usually referred to as [CC-BY](#g:cc-by).
This allows people to do whatever they want to with the work
as long as they cite the original source.
This is the best license to use for manuscripts,
since you *want* people to share them widely
but also want to get credit for your work.

Other Creative Commons licenses incorporate various restrictions on specific use cases:

-   ND (no derivative works) prevents people from creating modified versions of your work.
    Unfortunately, this also inhibits translation and reformatting.
-   NC (no commercial use) does *not* mean that people cannot charge money for something that includes your work,
    though some publishers still try to imply that in order to scare people away from open licensing.
    Instead,
    the NC clause means that people cannot charge for something that uses your work without your explicit permission,
    which you can give under whatever terms you want.
-   Finally,
    SA (share-alike) requires people to share work that incorporates yours
    on the same terms that you used.
    Again,
    this is fine in principle,
    but in practice makes aggregation a headache.

## Code of Conduct {#s:collab-conduct}

You don't expect to have a fire,
but every large building or event should have a fire safety plan.
Similarly,
having a Code of Conduct like [s:conduct](#REF) for your project
reduces the uncertainty that participants face about what is acceptable and unacceptable behavior.
You might think this is obvious,
but long experience shows that articulating it clearly and concisely reduces problems caused by have different expectations,
particularly when people from very different cultural backgrounds are trying to collaborate.
An explicit Code of Conduct is particularly helpful for newcomers,
so having one can help your project grow
and encourage people to give you feedback.

Having a Code of Conduct is particularly important for people from marginalized or under-represented groups,
who have probably experienced harassment or unwelcoming behavior before.
By adopting one,
you signal that your project is trying to be a better place than YouTube,
Twitter,
and other online cesspools.
Some people may push back claiming that it's unnecessary,
or that it infringes freedom of speech,
but in our experience,
what they often mean is that thinking about how they might have benefited from past inequity makes them feel uncomfortable,
or that they like to argue for the sake of arguing.
If having a Code of Conduct leads to them going elsewhere,
that will probably make your project run more smoothly.

Just as you shouldn't write your own license for a project,
you probably shouldn't write your own Code of Conduct.
We recommend using the [Contributor Covenant][covenant] for development projects
and the [model code of conduct][model-coc] from the [Geek Feminism Wiki][geek-feminism] for in-person events.
Both have been thought through carefully and revised in the light of experience,
and both are now used widely enough that
many potential participants in your project will not need to have them explained.

Rules are meaningless if they aren't enforced.
If you adopt a Code of Conduct,
it is therefore important to be clear about how to report issues and who will handle them.
[Auro2018](#BIB) is a short, practical guide to handling incidents;
like the Contributor Covenant and the model code of conduct,
it's better to start with something that other people have thought through and refined
than to try to create something from scratch.

{% include links.md %}
